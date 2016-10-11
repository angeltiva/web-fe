// 对比两棵树
function diff(oldTree, newTree) {
    var index = 0;
    var patches = {};

    return patches;
}

function dfsWalk(oldNode, newNode, index, patches) {
    patches[index] = [...]
    diffChildren(oldNode.children, newNode.children, index, patches)
}

function diffChildren(oldChilren, newChildren, index, patches) {
    var leftNode = null;
    var currentNodeIndex = index;
    oldChilren.forEach(child, i) {
        var newChild = newChildren[i];
        currentNodeIndex = (leftNode && leftNode.count)
        ? currentNodeIndex + leftNode.count + 1
        : currentNodeIndex + 1
        dfsWalk(child, newChild, currentNodeIndex, patches);
        leftNode = child;
    }
}