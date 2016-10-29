/**
 * @file 绑定事件
 * @author tiva
 */

function delegate(element, type, targetSelector, handler) {
    if (element.addEventListener) {
        element.addEventListener(type, eventFn);
    }
    else {
        element.attachEvent("on" + type, eventFn);
    }

    function eventFn(e) {
        var e = e || window.event;
        var target = e.target || e.srcElement;
        var targets = element.querySelectorAll(targetSelector);

        if (targets.indexOf(target) != -1) {
            return handler.apply(target, arguments);
        }
    }
}
