/**
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function(nums) {
  const numSet = new Set();
  for (let num of nums) {
    if (numSet.has(num)) {
      return num;
    } else {
      numSet.add(num);
    }
  }
  return -1;
};
