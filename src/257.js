/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {string[]}
 */
var binaryTreePaths = function(root) {
  const ret = [];
  const stack = [root];
  while (stack.length) {
    const node = stack.pop();
    if (!node) {
      break;
    }
    if (node.left && !node.left.marked) {
      stack.push(node, node.left);
      node.left.marked = true;
    } else if (node.right && !node.right.marked) {
      stack.push(node, node.right);
      node.right.marked = true;
    } else if (!node.left && !node.right) {
      // is leaf
      const path = stack.map(n => n.val);
      path.push(node.val);
      ret.push(path.join("->"));
    }
  }
  return ret;
};
