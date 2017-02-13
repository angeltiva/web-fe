define(function (require, exports) {

    'use strict';

    return Ractive.extend({
        template: require('tpl!./white.html'),
        data: function () {
            return {
                name: 'white'
            };
        },
        onrender: function () {

        }
    });

})