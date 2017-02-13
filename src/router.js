
define(function (require, exports) {

    'use strict';

    var PREFIX_HASH = '#!';
    var PREFIX_PARAM = ':';
    var PREFIX_QUERY = '?';
    var SEPARATOR_PATH = '/';
    var SEPARATOR_QUERY = '&';
    var SEPARATOR_PAIR = '=';
    var FLAG_ARRAY = '[]';

    var blue = require('router/blue/blue');
    var white = require('router/white/white');
    var green = require('router/green/green');

    function getHashString(query) {
        if (!query) {
            return;
        }
        var decodeQuery = decodeURIComponent(query);
        var prefixIndex = decodeQuery.indexOf('#!');
        var index = prefixIndex + PREFIX_HASH.length;

        return decodeQuery.substr(+index);
    }

    function parseQuery(data) {
        data = getHashString(data);
        var query;
        var result = {};

        if (/\?/.test(data)) {
            var item = data.split('?');
            result['name'] = item[0];
            query = item[1];
        }
        else {
            result['name'] = data;
        }

        if (!query) {
            return result;
        }

        $.each(
            query.split('&'),
            function (index, value) {
                var item = value.split('=');
                var key = item[0];
                if (/\[]/.test(key)) {
                    var arrName = key.split('[]')[0];
                    result[arrName] = result[arrName] || [];
                    result[arrName].push(item[1]);
                }
                else {
                    result[key] = item[1];
                }
            }
        );
        return result;
    }

    function stringifyQuery(data) {
        if (!data) {
            return;
        }
        var result = [];
        $.each(
            data,
            function (key, value) {
                if ($.isArray(value)) {
                    if (!value.length) {
                        result.push(key + FLAG_ARRAY + SEPARATOR_PAIR + value);
                    }
                    else {
                        $.each(
                            value,
                            function (index, item) {
                                result.push(key + FLAG_ARRAY + SEPARATOR_PAIR + item);
                            }
                        );
                    }
                }
                else {
                    result.push(key + SEPARATOR_PAIR + value);
                }
            }
        );
        return result.join('&');
    }

    exports.init = function () {

        class router {

            constructor() {
                // 映射关系
                this.routes = {};
                this.paths = [];
                this.currentUrl = '';
            }

            registor(name, component) {
                this.routes[name] = component;
            }

            route(data) {
                var name;
                if (typeof data == "string") {
                    name = data;
                    location.hash = PREFIX_HASH + data;
                }
                else {
                    if (!data.name) {
                        console.error('没有组件名');
                    }
                    name = data.name;
                    var hash = name + PREFIX_QUERY + stringifyQuery(data.query);
                    location.hash = PREFIX_HASH + hash;
                }
            }

            onhashchange() {
                this.currentUrl = location.hash || SEPARATOR_PATH;
                this.addPath(this.currentUrl);
                this.setComponent(this.currentUrl);
            }

            addPath(path) {
                if (this.paths.length > 10) {
                    this.paths.shift();
                    this.paths.push(path);
                }
                else {
                    this.paths.push(path);
                }
            }

            setComponent(data) {
                var paramsOptions = parseQuery(data);
                var name = paramsOptions.name;
                var component = this.routes[name];
                if ($.isFunction(component)) {
                    var me = this;
                    var instance = new Ractive({
                        el: '#content',
                        data: paramsOptions,
                        template: '<Router data="{{paramsOptions}}" />',
                        components: {
                            Router: component
                        },
                        onrender: function () {
                            var component = this.findComponent('Router');
                            if ($.isFunction(component.reroute)) {
                                if (me.paths.length <= 1) {
                                    return;
                                }

                                component.reroute(me.currentUrl, me.paths[me.paths.length - 2]);
                            }
                        }
                    });
                }
            }

            start() {
                router.handleHashChange = this.onhashchange.bind(this);
                router.handleHashChange();
                window.addEventListener('hashchange', router.handleHashChange, false);
            }

            stop() {
                router.handleHashChange = null;
            }

        }

        window.Router = new router();
        Router.registor('blue', blue);
        Router.registor('white', white);
        Router.registor('green', green);
        window.Router.start();

        var ractive = new Ractive({
            el: '#container',
            template: require('tpl!./test.html'),
            onrender: function () {
                var me = this;
            },
            whiteClick: function () {
                console.log('whiteClick');
                Router.route('white');
            },
            blueClick: function () {
                console.log('blueClick');
                Router.route({
                    name: 'blue',
                    query: {
                        videoId: 13,
                        parentId: 16,
                        a: [1,21,21]
                    }
                });
            },
            greenClick: function () {
                console.log('greenClick');
                Router.route({
                    name: 'green',
                    query: {
                        videoId: 12
                    }
                });
            }
        });
    }

})

