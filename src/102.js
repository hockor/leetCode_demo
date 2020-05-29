/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
  const stack = [[0, root]];
  const ret = [];
  while (stack.length) {
    const [level, node] = stack.shift();
    if (!node) {
      continue;
    }
    if (!Array.isArray(ret[level])) {
      ret[level] = [];
    }
    ret[level].push(node.val);
    if (node.left) {
      stack.push([level + 1, node.left]);
    }
    if (node.right) {
      stack.push([level + 1, node.right]);
    }
  }
  return ret;
};

console.log("good");
