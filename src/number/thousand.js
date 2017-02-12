/**
 * 给整数加上千位分隔符
 *
 * @param {Number} num 源数字
 * @return {String}
 */

function thousand(num, float) {
    var floatNumber;
    var result;

    if (float) {
        num = new String(num).split('.');
        floatNumber = num [1];
        num = num[0];
    }
    num = new String(num).split('');

    var i = num.length;
    var j = 0;

    while (i--) {
        j++;
        if (j === 4) {
            num.splice(i + 1, 0, ',');
            j = 0;
        }
    }
    result = float && floatNumber
            ? num.join('') + '.' + floatNumber
            : num.join('');
    console.log(result);
    return result;
}

// example:
thousand(289887); //返回 289,887
thousand(-89887); //返回 -89,887
thousand(289887.89, true);