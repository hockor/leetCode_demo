/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxPathSum = function(root) {
  let node;
  const queue = [root];
  let max = -Infinity;
  while (queue.length) {
    node = queue.shift();
    max = Math.max(max, findMaxDownStream(node, true));
    if (node.left) {
      queue.push(node.left);
    }
    if (node.right) {
      queue.push(node.right);
    }
  }
  return max;
};

const cache = new Map();
const rootKey = Symbol.for("isRoot");
const nonRootKey = Symbol.for("nonRoot");

function findMaxDownStream(root, isRoot = false) {
  if (!root) {
    return 0;
  }
  const key = isRoot ? rootKey : nonRootKey;
  const cacheValue = cache.get(root);
  if (cacheValue && cacheValue[key]) {
    return cacheValue[key];
  }
  let max = root.val;
  const leftMax = findMaxDownStream(root.left);
  const rightMax = findMaxDownStream(root.right);
  const extra = isRoot ? max + leftMax + rightMax : max;
  const result = Math.max(max, max + leftMax, max + rightMax, extra);
  cache.set(root, {
    [key]: result,
    ...cache.get(root)
  });
  return result;
}
