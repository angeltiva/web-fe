define(function (require, exports) {

    'use strict';

    exports.init = function (data) {
        var ractive = new Ractive({
            el: '#content',
            template: require('tpl!./blue.html'),
            data: {},
            onrender: function () {

            }
        });
    }
})