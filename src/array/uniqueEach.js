/**
 * 去除重复值后，遍历数组（包括json数组，根据指定属性排重），执行处理函数。如果处理函数返回false，将中止遍历。
 *
 * @param {Array} arr
 * @param {String} prop
 * @param {Function} handler
 */

function uniqueEach(arr, prop, handler) {
    var result = [];
    var i = 0;
    var len = arr.length;
    var props = [];

    if (typeof prop !== 'string') {
        handler = prop;
        for (; i < len; i++) {
            if (result.indexOf(arr[i]) == -1) {
                result.push(arr[i]);
                if (prop(i, arr[i]) == false) {
                    break;
                }
            }
        }
    }
    else {
        for (; i < len; i++) {
            var value = arr[i];
            for (var key in value) {
                if (prop == key && value.hasOwnProperty(prop)) {
                    if (props.indexOf(value[prop]) == -1) {
                        props.push(value[prop]);
                        result.push(value);
                        if (handler(i, arr[i]) == false) {
                            break;
                        }
                    }
                }
            }
        }
    }
    return result;
}

// example:

uniqueEach([1, 3, 2, 1, '3'], function (i, value) {
    console.log(i, value);
});
uniqueEach([{a:1, b:3}, {a:2, b:1}, {a:5, b:1}], 'b', function (key, value) {
    console.log(key, value);
});