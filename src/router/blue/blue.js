define(function (require, exports) {

    'use strict';

    return Ractive.extend({
        template: require('tpl!./blue.html'),
        data: function () {
            return {
                name: 'blue'
            }
        },
        onrender: function () {

        }
    });

})