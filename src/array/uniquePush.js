/**
 * 将一个非引用类型的值添加到数组末尾，并删除数组里之前已有的与之相等的元素。
 *
 * @param {Array} arr
 * @param {String Boolean Number} item
 * @param {Number} maxLength
 */

function uniquePush(arr, item, maxLength) {
    var result = [];
    var i = 0;
    var len = arr.length;
    for (; i < len; i++) {
        if (arr[i] != item) {
            result.push(arr[i]);
        }
    }
    result.push(item);

    if (maxLength && maxLength < result.length) {
        var index = result.length - maxLength;
        result = result.splice(index);
    }
    console.log(result);
    return result;
}
// example:
uniquePush([1, 3, 2], 3); // => [1, 2, 3]
uniquePush([1, 2, 3, 5], 6, 4); // => [2, 3, 5, 6]