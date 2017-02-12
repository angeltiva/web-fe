
define(function (require, exports) {

    'use strict';

    var PREFIX_HASH = '#!';
    var PREFIX_PARAM = ':';
    var SEPARATOR_PATH = '/';
    var SEPARATOR_QUERY = '&';
    var SEPARATOR_PAIR = '=';
    var FLAG_ARRAY = '[]';

    var blue = require('router/blue/blue');
    var white = require('router/white/white');
    var green = require('router/green/green');

    function parseQuery(query) {
        if (!query) {
            return;
        }
        query = decodeURIComponent(query);
        var result = {};
        $.each(
            query.split('&'),
            function (index, value) {
                var item = value.split('=');
                result[item[0]] = item[1];
            }
        );
        return result;
    }

    function stringifyQuery(query) {
        if (!query) {
            return;
        }
        var result = [];
        $.each(
            query,
            function (key, value) {
                result.push(key + '=' + value);
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
                // route(path)
                if (typeof data == "string") {
                    location.hash = data;
                }
                else {
                    location.hash = stringifyQuery(data);
                }
                var component = this.routes[data];
                component.init();
            }

            onhashchange() {
                this.currentUrl = location.hash.slice(1) || '/';
                this.route(this.currentUrl);
                this.setComponent(location.hash);
            }

            setComponent(data) {
                var createComponent = function () {};
                var changeComponent = function () {};
            }

            start() {
                router.handleHashChange = this.onhashchange.bind(this);
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
                Router.route('blue');
            },
            greenClick: function () {
                console.log('greenClick');
                Router.route({
                    green
                });
            }
        });
    }

})

