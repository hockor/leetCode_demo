/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function(nums) {
  if (!nums.length) {
    return 0;
  }
  let max = Math.max(...nums);
  nums = nums.filter(num => num !== 1);
  const zeroList = [];
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    if (num === 0) {
      zeroList.push(i);
    }
  }
  if (zeroList.length) {
    const numsList = [];
    let endIndex = nums.length;
    while (zeroList.length) {
      const startIndex = zeroList.pop();
      numsList.push(nums.slice(startIndex + 1, endIndex));
      endIndex = startIndex;
    }
    numsList.push(nums.slice(0, endIndex));
    return Math.max(max, ...numsList.map(numsArg => maxProduct(numsArg)));
  }
  let prevArray = nums;
  let currentArray = [];
  let count = 0;
  while (count < nums.length) {
    const offset = count + 1;
    for (let i = offset; i < nums.length; i++) {
      const prevI = i - offset;
      const num = nums[i];
      const prevNum = prevArray[prevI];
      const result = num * prevNum;
      currentArray.push(result);
      max = Math.max(max, result);
    }
    prevArray = currentArray;
    currentArray = [];
    count++;
  }
  return max;
};
