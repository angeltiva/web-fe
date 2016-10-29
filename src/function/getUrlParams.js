/**
 * @file 获取 get 参数
 * @author tiva
 */

/**
 * 获取 get 参数
 *
 * @param {string} url
 * @return {Object} 返回一个对象
 */

function getUrlParams(url) {
    var obj = { };
    url = decodeURIComponent(url);
    var beginPos = url.indexOf('?') + 1;
    var endPos = url.indexOf('#');

    var data = endPos === -1
            ? url.substring(beginPos).split('&')
            : url.substring(beginPos, endPos).split('&');

    for (var i = 0; i < data.length; i++) {
        var key = data[i].split('=')[0];
        var value = data[i].split('=')[1];
        obj[key] = value;
    }
    return obj;
}

