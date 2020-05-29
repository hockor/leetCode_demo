/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var isPossibleDivide = function(nums, k) {
  if (nums.length % k !== 0) {
    return false;
  }
  let count = nums.length / k;
  while (count) {
    const min = Math.min(...nums);
    const index = nums.indexOf(min);
    nums.splice(index, 1);
    for (let i = 1; i < k; i++) {
      const next = min + i;
      const nextIndex = nums.indexOf(next);
      if (nextIndex > -1) {
        nums.splice(nextIndex, 1);
      } else {
        return false;
      }
    }
    count--;
  }
  return true;
};
