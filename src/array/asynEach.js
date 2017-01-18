/**
 * 遍历数组，按顺序异步处理每一项，并且处理完一项才能处理下一项
 *
 * @param {Array} arr
 * @param {Function} handler
 * @param {Function} onEndHandler 全部解析成功的回掉
 * @return {number}
 */

function asynEach(arr, handler, onEndHandler) {

    var len = arr.length;
    var i = 0;

    var operate = function () {
        if (i < len) {
            handler(arr[i], i++, operate);
        }
        else {
            onEndHandler && onEndHandler();
        }
    }
    operate();
}
// example:

var files = [2,3,4,56,7,7];

asynEach(files,
    function (file, i, next) {
        console.log(i)
        next();
    },
    function () {
        console.log('done!');
    }
);
