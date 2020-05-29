/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function(nums) {
  if (nums.length <= 1) {
    return 0;
  }
  const { length } = nums;
  const queue = [length - 1];
  let minSteps = 0;
  while (queue.length) {
    const baseIndex = queue.pop();
    for (let i = baseIndex - 1; i >= 0; i--) {
      const current = nums[i];
      const offset = baseIndex - i;
      if (current >= offset) {
        if (i === 0) {
          return minSteps + 1;
        }
        queue.push(i);
      }
    }
    minSteps++;
  }
  return Infinity;
};
