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
var findFrequentTreeSum = function(root) {
  if (!root) {
    return [];
  }
  exhaustTree(root);
  return findMax();
};

function exhaustTree(root) {
  if (root.left) {
    exhaustTree(root.left);
  }
  if (root.right) {
    exhaustTree(root.right);
  }
  updateCache(sum(root));
}

let cache = {};
const updateCache = num => {
  if (typeof cache[num] === "number") {
    cache[num]++;
  } else {
    cache[num] = 1;
  }
};

function findMax() {
  const entries = Object.entries(cache);
  cache = {};
  const values = entries.map(([_, value]) => value);
  const max = Math.max(...values);
  return entries
    .filter(([_, value]) => {
      return value === max;
    })
    .map(([key]) => key);
}

function sum(root) {
  if (typeof root.sum === "number") {
    return root.sum;
  }
  let val = root.val;
  if (root.left) {
    val += sum(root.left);
  }
  if (root.right) {
    val += sum(root.right);
  }
  root.sum = val;
  return val;
}
