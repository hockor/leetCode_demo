/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
  const mRob = getMRob();
  return mRob(nums, 0);
};

function getMRob() {
  const cache = new Map();
  return function mRob(nums, startIndex) {
    if (startIndex >= nums.length) {
      return 0;
    }
    if (cache.has(startIndex)) {
      return cache.get(startIndex);
    }
    let max = 0;
    for (let i = startIndex; i < nums.length; i++) {
      const num = nums[i];
      max = Math.max(max, num + mRob(nums, i + 2));
    }
    cache.set(startIndex, max);
    return max;
  };
}
