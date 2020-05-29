/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function(nums) {
  let min = 1;
  while (nums.includes(min)) {
    min++;
  }
  return min;
};
