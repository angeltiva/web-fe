/**
 * 将 array 中的前 n 个元素去掉，然后返回剩余的部分。
 *
 * @param {Array} 被操作的数组
 * @param {number} 去掉的元素个数
 * @return {arr} 返回 array 的剩余部分
 */

function drop(arr, n) {
    if (n == undefined) {
        return arr.splice(1);
    }
    else if (n == 0) {
        return arr;
    }
    else {
        return arr.splice(n);
    }
    return arr;
}

console.log(drop([1, 2, 3]));
console.log(drop([1, 2, 3], 2));
console.log(drop([1, 2, 3], 5));
console.log(drop([1, 2, 3], 0));