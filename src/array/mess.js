/**
 * 洗牌算法，即随机打乱数组。
 *
 * @param {Array} arr
 * @return {number}
 */

function mess(arr) {
    var result = arr;
    var i = result.length;
    var j;
    while(i > 1) {
        j = Math.floor(Math.random() * i);
        i--;
        if (j != i) {
            var temp = result[i];
            result[i] = result[j];
            result[j] = temp;
        }
    }
    return result;
}

// example:
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
var arr1 = mess(arr);
console.log(arr1)