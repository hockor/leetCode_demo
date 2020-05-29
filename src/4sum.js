/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function(nums, target) {
  nums.sort();
  const allFours = s(nums, target).map(arr => arr.join(","));
  const set = new Set(allFours);
  return [...set].map(str => str.split(","));
};

function s(nums, target, start = 0, level = 1) {
  if (level === 4) {
    const index = nums.indexOf(target, start);
    return index > -1 ? [[target]] : [];
  }
  let ret = [];
  for (let i = start; i < nums.length; i++) {
    const num = nums[i];
    const left = target - num;
    ret = ret.concat(s(nums, left, i + 1, level + 1).map(arr => [num, ...arr]));
  }
  return ret;
}
