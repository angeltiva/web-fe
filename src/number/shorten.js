/**
 * 将一个数字缩短为带“万”、“亿”等单位的数字
 *
 * @param {Number} num 源数字
 * @param {Number} fix 可选，默认值：1。小数点后保留几位小数，默认保留1位
 * @return {String}
 */

function shorten(num, fix) {
    var result = '';
    var n = num > 0 ? num : -num;
    fix = fix == undefined ? 1 : fix;

    if (num < 1E4) {
        result = String(num);
    }
    else if (n < 1E8) {
        result = fix >= 0
                ? (num / 1E4).toFixed(fix) + '万'
                : Math.round(num * Math.pow(10, fix) * 1E-4) * Math.pow(10, (-1 * fix)) + '万';
    }
    else {
        result = fix >= 0
                ? (num / 1E8).toFixed(fix) + '亿'
                : Math.round(num * Math.pow(10, fix) * 1E-8) * Math.pow(10, (-1 * fix)) + '亿';
    }

    console.log(result)
    return result;
}

// example:
shorten(8938382); // 893.8万
shorten(8938382, 0); // 894万
shorten(8938382, -1); // 890万
shorten(8938382, -2); // 900万
shorten(8938382, -3); // 1000万
shorten(-898); // -
898
shorten(89383821111, -1);
shorten(89383821111, -3);