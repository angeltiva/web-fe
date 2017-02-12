/**
 * 计算字符串长度，将 unicode 字符计算为2个单位
 *
 * @param {Number} str 源字符串
 * @return {String}
 */

function byteLength(str) {
    return str.replace(/[^\x00-\xff]/g, '00').length;
}

// example:

byteLength('中国人'); //6
byteLength('china'); //5
byteLength('中国ren'); //7