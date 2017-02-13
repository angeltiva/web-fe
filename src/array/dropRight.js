/**
 * 将 array 尾部的 n 个元素去除，并返回剩余的部分。
 *
 * @param {Array} 需要被处理数组
 * @param {n} 去掉的元素个数
 * @return {arr} 返回 array 的剩余部分。
 */

function dropRight(arr, n) {
    if (n == undefined) {
        arr.pop();
        return arr;
    }
    else if (n == 0) {
        return arr;
    }
    else {
        n = arr.length - n;
        arr.splice(n);
        return arr;
    }
    return arr;
}


console.log(dropRight([1, 2, 3]));
console.log(dropRight([1, 2, 3], 2));
console.log(dropRight([1, 2, 3], 5));
console.log(dropRight([1, 2, 3], 0));