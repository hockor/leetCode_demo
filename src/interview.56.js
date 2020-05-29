/**
 * @param {number[]} nums
 * @return {number[]}
 */
var singleNumbers = function(nums) {
  const ret = [];
  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length; ) {
    const nextI = i + 1;
    if (nextI > nums.length - 1) {
      ret.push(nums[i]);
      break;
    }
    if (nums[i] !== nums[nextI]) {
      ret.push(nums[i]);
      i++;
    } else {
      i += 2;
    }
  }
  return ret;
};
