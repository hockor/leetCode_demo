/**
 * @param {number[]} nums
 * @return {number}
 */
var reversePairs = function(nums) {
  return reverseFind(nums);
};

function reverseFind(nums) {
  const set = new Set(nums);
  const unifiedArray = Array.from(set).sort((a, b) => a - b);
  const indexHash = {};
  for (let i = 0; i < unifiedArray.length; i++) {
    const num = unifiedArray[i];
    indexHash[num] = i;
  }
  const orderedArray = new Array(set.size).fill(0);
  let index = nums.length - 1;
  let count = 0;
  // form hash
  while (index > -1) {
    const num = nums[index];
    const indexInHash = indexHash[num];
    orderedArray[indexInHash]++;
    count += sumRange(0, indexInHash)(orderedArray);
    index--;
  }
  return count;
}

const sumRange = (start, end) => array => {
  let count = 0;
  for (let i = start; i < end; i++) {
    count += array[i];
  }
  return count;
};
