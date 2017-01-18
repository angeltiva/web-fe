/**
 * 判断节点 a 是否包含节点 b
 *
 * @param {HTMLElement} a
 * @param {HTMLElement} b
 * @return {Bool}
 */

function contains(a, b) {
    if (document.documentElement.contains) {
        return a.contains(b)
    }
    else if (document.documentElement.compareDocumentPosition) {
        return a.compareDocumentPosition(b) == 16;
    }
    else {
        while(b) {
            if (a == b) {
                return true;
            }
            b = b.parentNode;
        }
    }

    return false;
}

// example: