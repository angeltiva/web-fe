/**
 * 截取指定长度的字符串
 *
 * @param {String} str 源字符串
 * @param {Number} clipLen 截取长度
 * @param {Number} limitLen 可选。最大长度，默认是截取长度。超过这个最大长度才截字符串。
 * @param {Number} suffix 可选，默认值：'…'。超过截取长度时添加的后缀
 * @return {String}
 */

function clip(str, clipLen, limitLen, suffix) {
    var result;
    var len = str.replace(/[^\x00-\xff]/g, '00').length;
    if (len < clipLen) {
        result = str;
    }
}

// example:

clip('我是中国人', 8); //我是中国…
clip('我是中国人', 8, '..'); //我是中国..
clip('我是中国人', 8, 10); //我是中国人
clip('我是中国人哈哈哈', 8, 10); //我是中国…