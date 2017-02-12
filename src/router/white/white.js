define(function (exports, require) {

    'use strict';
    exports.init = function (data) {

        var ractive = new Ractive({
            el: '#content',
            template: require('tpl!./white.html'),
        });
    }

})