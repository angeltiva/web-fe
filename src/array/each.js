/**
 * 遍历数组或纯对象，执行处理函数。如果处理函数返回false，将中止遍历。
 *
 * @param {Object} obj
 * @param {Function} handler
 * @return {number}
 */

function each(obj, handler) {
    if (obj instanceof Array) {
        for (var i = 0, len = obj.length; i < len; i++) {
            if (handler(i, obj[i]) == false) {
                break;
            }
        }
    }
    else {
        for (var i in obj) {
            // 原型链上的属性都可以被遍历
            if (obj.hasOwnProperty(i)) {
                if (handler(i, obj[i]) == false) {
                    break;
                }
            }
        }
    }
}

// example:

each([1, 3, 2, 1], function (i, value) {
    console.log(i, value);
});
each({a:1, b:3}, function (key, value) {
    console.log(key, value);
    return false; //只会打印出 a 1
});

