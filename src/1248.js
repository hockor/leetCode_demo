/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var numberOfSubarrays = function(nums, k) {
  const oddArray = [];
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    if (isOdd(num)) {
      oddArray.push(i);
    }
  }
  if (oddArray.length < k) {
    return 0;
  }
  let count = 0;
  for (let i = 0; i < oddArray.length; i++) {
    const start = oddArray[i];
    const endIndex = i + k - 1;
    if (endIndex > oddArray.length - 1) {
      break;
    }
    const end = oddArray[endIndex];
    const startLimit = i === 0 ? 0 : oddArray[i - 1] + 1;
    const endLimit =
      endIndex === oddArray.length - 1
        ? nums.length - 1
        : oddArray[endIndex + 1] - 1;
    const prefixCount = start - startLimit + 1;
    const suffixCount = endLimit - end + 1;
    count += prefixCount * suffixCount;
  }
  return count;
};

function isOdd(num) {
  return num % 2 !== 0;
}
