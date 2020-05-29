/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var rightSideView = function(root) {
  if (!root || !root.val) {
    return [];
  }
  // bfs
  const levelArray = bfs(root);
  return levelArray.map(node => node.val);
};

function bfs(root) {
  const levelArray = [];
  const decoratedRoot = decorateWithLevel(root);
  levelArray[0] = decoratedRoot;
  const { left, right } = decoratedRoot;
  const queue = [left, right];
  while (queue.length) {
    const first = queue.shift();
    if (first !== null) {
      // need level info
      levelArray[first.level] = first;
      queue.push(first.left, first.right);
    }
  }
  return levelArray;
}

function decorateWithLevel(node, level = 0) {
  const privateKey = Symbol.for("node");
  if (node[privateKey]) {
    return node;
  }
  const { left, right, val } = node;
  const newNode = {
    [privateKey]: true,
    level,
    get left() {
      if (left) {
        return decorateWithLevel(left, level + 1);
      }
      return null;
    },
    get right() {
      if (right) {
        return decorateWithLevel(right, level + 1);
      }
      return null;
    },
    get val() {
      return val;
    }
  };
  return newNode;
}
