/**
 * 创建一个新数组并包含原数组中所有的非假值元素
 *
 * @param {Array} 需要被处理的数组
 * @return {number}
 */

function compact(arr) {
    for (var i = 0; i < arr.length; i++) {
        if (!arr[i]) {
            arr.splice(i, 1);
        }
    }
    return arr;
}

console.log(compact([0, 1, false, 2, '', 3]));