/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} s
 * @param {TreeNode} t
 * @return {boolean}
 */
var isSubtree = function(s, t) {
  const bfsStack = [s];
  const possibleRoots = [];
  while (bfsStack.length) {
    const node = bfsStack.pop();
    if (node.val === t.val) {
      possibleRoots.push(node);
    }
    if (node.left) {
      bfsStack.push(node.left);
    }
    if (node.right) {
      bfsStack.push(node.right);
    }
  }
  if (!possibleRoots.length) {
    return false;
  }

  return possibleRoots.some(root => isTreeContained(root, t));
};

function isTreeContained(s, t) {
  const stackForSource = [];
  const stackForTarget = [];
  const collect = stack => n => {
    let ref = n;
    while (ref) {
      stack.push(ref);
      ref = ref.left;
    }
  };
  const collectSource = collect(stackForSource);
  const collectTarget = collect(stackForTarget);
  collectSource(s);
  collectTarget(t);
  while (stackForSource.length) {
    const leftFromSource = stackForSource.pop();
    const leftFromTarget = stackForTarget.pop();
    if (!leftFromTarget) {
      return false;
    }
    if (leftFromSource.val === leftFromTarget.val) {
      collectSource(leftFromSource.right);
      collectTarget(leftFromTarget.right);
    } else {
      return false;
    }
  }
  if (stackForTarget.length) {
    return false;
  }
  return true;
}
