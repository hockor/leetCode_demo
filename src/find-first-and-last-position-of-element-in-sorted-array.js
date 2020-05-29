/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function(nums, target) {
  if (target < nums[0]) {
    return [-1, -1];
  }
  if (target > nums[nums.length - 1]) {
    return [-1, -1];
  }
  const { length } = nums;
  let start = 0;
  let half = Math.floor(length / 2);
  let end = length;
  let index = -1;
  let lastIndex = -1;
  while (true) {
    if (start === half) {
      if (target === nums[start]) {
        return [start, start];
      }
      break;
    }
    if ([start, half, end].some(item => item < 0)) {
      break;
    }
    const firstHalf = nums.slice(start, half);
    const secondHalf = nums.slice(half, end);
    const { length: firstLen } = firstHalf;
    const { length: secondLen } = secondHalf;
    if (target > firstHalf[firstLen - 1]) {
      start = half;
    } else if (target < secondHalf[0]) {
      end = half;
    } else if (target < firstHalf[0] || target > secondHalf[secondLen - 1]) {
      break;
    } else {
      const tempIndexArray = [half - 1, half].filter(i => nums[i] === target);
      index = Math.min(...tempIndexArray);
      lastIndex = index;
      let afterDone = false;
      let beforeDone = false;
      while (true) {
        if (beforeDone && afterDone) {
          break;
        }
        if (nums[index - 1] === target) {
          index--;
        } else {
          beforeDone = true;
        }
        if (nums[lastIndex + 1] === target) {
          lastIndex++;
        } else {
          afterDone = true;
        }
      }
      return [index, lastIndex];
    }

    half = Math.floor((start + end) / 2);
  }
  return [index, lastIndex];
};
