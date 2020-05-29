/**
 * @param {number[]} nums
 * @return {number}
 */
var massage = function(nums) {
  cache = {};
  return calculate(nums);
};

let cache = {};

const calculate = (nums, start = 0) => {
  if (!nums.length) {
    return 0;
  }
  if (nums.length === 1) {
    return nums[0];
  }
  if (nums.length === 2) {
    return Math.max(...nums);
  }

  let ret = 0;
  for (let i = start; i < Math.min(start + 2, nums.length); i++) {
    if (typeof cache[i] === "number") {
      ret = Math.max(ret, cache[i]);
      continue;
    }
    const num = nums[i];
    const nextIndex = i + 2;
    const temp = num + calculate(nums, nextIndex);
    cache[i] = temp;
    ret = Math.max(ret, temp);
  }
  return ret;
};
