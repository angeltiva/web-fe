/**
 * @file 遍历一个 dom 树 找到指定 id 的 dom
 * @author tiva
 */

function walkDom(domTree, id) {
    for(var i = 0, len = node.childNodes.length; i < len; i++) {
        var element = domTree.childNodes[i];
        if (element.length) {
            walkDom(element, id)
        }
        if (element.id && element.id === id) {
            return element;
        }
    }
}
