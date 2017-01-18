/**
 * 将一个非引用类型的值添加到数组头部，并删除数组里之前已有的与之相等的元素。
 *
 * @param {Array} arr
 * @param {String Boolean Number} item
 * @param {Number} maxLength
 */

function uniqueUnshift(arr, item, maxLength) {
    var result = [];
    var i = 0;
    var len = arr.length;
    for (; i < len; i++) {
        if (arr[i] != item) {
            result.push(arr[i]);
        }
    }
    result.unshift(item);

    if (maxLength && maxLength < result.length) {
        result.splice(maxLength);
    }
    console.log(result);
    return result;
}
// example:
uniqueUnshift([1, 3, 2], 3); // => [3, 1, 2]
uniqueUnshift([1, 2, 3, 5], 6, 4); // => [6, 1, 2, 3]