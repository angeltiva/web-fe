/**
 * @file 获取指定格式的时间
 * @author tiva
 */

/**
 * formatDateTime 得到指定格式的时间
 *
 * @param {date} date
 * @param {String} format 例如：'YYYY-MM-DD hh:mm'
 * @return {?String} 格式化之后的时间
 */
function formatDateTime(date, format) {
    if (!format) {
        format = 'YYYY-MM-DD hh:mm';
    }
    if (!date) {
        date = new Date();
    }

    return format
        .replace('YYYY', date.getFullYear())
        .replace('MM', leftPad(date.getMonth() + 1, 2, '0'))
        .replace('DD', leftPad(date.getDay(), 2, '0'))
        .replace('mm', leftPad(date.getMinutes(), 2, '0'))
        .replace('hh', leftPad(date.getHours(), 2, '0'))
        .replace('ss', leftPad(date.getSeconds(), 2, '0'));
}

function leftPad(str, length, fill) {
    str = str.toString();
    while(str.length < length) {
        str = fill + str;
    }
    return str;
}