/**
 * 过滤数组的指定值
 *
 * @param {Array} 需要过滤的数组
 * @param {...Array} 数组需要排除掉的值
 * @return {arr} 返回过滤后的数组
 */

function difference(arr, valueArr) {
    var result = [];
    for(var i = 0; i < arr.length; i++) {
        if (valueArr instanceof Array) {
            if (valueArr.indexOf(arr[i]) == -1) {
                result.push(arr[i]);
            }
        }
        else {
            if (arr[i] != valueArr) {
                result.push(arr[i]);
            }
        }
    }
    return result;
}

console.log(difference([1, 2, 3], [4, 2]));
console.log(difference([1, '2', 3], [4, 2]));
console.log(difference([1, '2', 3], 2));