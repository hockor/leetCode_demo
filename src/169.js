/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
  const cache = {};
  const threshHold = Math.ceil(nums.length / 2);
  for (const num of nums) {
    if (typeof cache[num] !== "number") {
      cache[num] = 1;
    } else {
      cache[num] += 1;
    }
    if (cache[num] >= threshHold) {
      return num;
    }
  }
};
