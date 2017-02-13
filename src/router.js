
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
                this.currentUrl = '';
            }

            registor(name, component) {
                this.routes[name] = component;
            }

            route(data) {
                var name;
                var paramsOptions = {};
                if (typeof data == "string") {
                    name = data;
                    location.hash = PREFIX_HASH + data;
                }
                else {
                    if (!data.name) {
                        console.error('没有组件名');
                    }
                    name = data.name;
                    paramsOptions = data.query;
                    var hash = name + PREFIX_QUERY + stringifyQuery(data.query);
                    location.hash = PREFIX_HASH + hash;
                }

                var component = this.routes[name];
                if ($.isFunction(component)) {
                    var instance = new Ractive({
                        el: '#content',
                        data: paramsOptions,
                        template: '<Router data="{{paramsOptions}}" />',
                        components: {
                            Router: component
                        }
                    });
                }
            }

            onhashchange() {
                this.currentUrl = location.hash || SEPARATOR_PATH;
                var name = parseQuery(this.currentUrl).name;
                this.setComponent(name);
            }

            setComponent(data) {
                var createComponent = function () {};
                var changeComponent = function () {};
            }

            start() {
                router.handleHashChange = this.onhashchange.bind(this);
                window.addEventListener('load', router.handleHashChange, false);
                window.addEventListener('hashchange', router.handleHashChange, false);
            }

            stop() {
                router.handleHashChange = null;
            }

        }

        window.Router = new router();
        window.Router.start();

        var ractive = new Ractive({
            el: '#container',
            template: require('tpl!./test.html'),
            onrender: function () {
                var me = this;
                Router.registor('blue', blue);
                Router.registor('white', white);
                Router.registor('green', green);
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
                        parentId: 16
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

