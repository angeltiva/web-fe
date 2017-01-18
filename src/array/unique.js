/**
 * 删除数组里的重复元素，或者将json数组里的每个json对象根据指定属性排重。
 *
 * @param {Array} arr
 * @return {String} prop
 */

function unique(arr, prop) {
    var result = [];
    var i = 0;
    var len = arr.length;
    var props = [];

    if (!prop) {
        for (; i < len; i++) {
            if (result.indexOf(arr[i]) == -1) {
                result.push(arr[i])
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
                    }
                }
            }
        }
    }
    return result;
}

// example:
var res = unique([1, 3, 2, 1, 5, 1, '2', '1', null, 'null', null, '']);
console.log(res); //[1, 3, 2, 5, '2', '1', null, 'null', '']
res = unique([{a:1, b:3}, {a:2, b:1}, {a:5, b:1}], 'b');
console.log(res); //[{a:1, b:3}, {a:2, b:1}]