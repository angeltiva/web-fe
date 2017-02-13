/**
 * 将 array 拆分成多个 size 长度的块，把这些块组成一个新数组
 *
 * @param {Array} 需要被处理的数组
 * @param {size} 每个块的长度
 * @return {arr}
 */

function add(a, b) {
    return +(new Number(a) + new Number(b));
}

function chunk(arr, size) {
    if (arr.length < size) {
        return arr;
    }
    var result = [];
    for(var i = 0, len = arr.length; i < len; i = add(i, size)) {
        result.push(arr.slice(i, add(size, i)))
    }
    return result;
}

console.log(chunk(['a', 'b', 'c', 'd'], 2));