define(function (require, exports) {

    'use strict';

    return Ractive.extend({
        template: require('tpl!./green.html'),
        data: function () {
            return {
                name: 'green'
            }
        },
        onrender: function () {

        }
    });

})