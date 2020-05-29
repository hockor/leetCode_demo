/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function(root) {
  if (!root) {
    return true;
  }
  const stack = [];
  const updateStack = entry => {
    let parent = entry;
    while (parent) {
      stack.push(parent);
      parent = parent.left;
    }
  };
  updateStack(root);
  let min = -Infinity;
  while (stack.length) {
    const last = stack.pop();
    if (last.val <= min) {
      return false;
    } else {
      min = last.val;
    }
    if (last.right) {
      updateStack(last.right);
    }
  }
  return true;
};
