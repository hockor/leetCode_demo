/**
 * @param {number[]} nums
 * @return {number}
 */
var reversePairs = function(nums) {
  let counter = 0;
  const getIndex = getReverPairOfIndex();
  for (let i = 0; i < nums.length; i++) {
    counter += getIndex(i, nums).length;
  }
  return counter;
};

function isReversePair(i, j, nums) {
  if (i >= j) {
    return false;
  }
  const numI = nums[i];
  const numJ = nums[j];
  return numI > 2 * numJ;
}

function getReverPairOfIndex() {
  const cache = {};
  return function getIndex(i, nums) {
    const num = nums[i];
    if (Array.isArray(cache[num])) {
      return cache[num].filter(index => index > i);
    }
    // there is a `number` key in cache that is gt `num`
    const keys = Object.keys(cache);
    let skipedIndice = [];
    for (let key of keys) {
      if (key > num) {
        skipedIndice = cache[key];
        break;
      }
    }
    let j = i + 1;
    const ret = [];
    while (j < nums.length) {
      if (skipedIndice.includes(j)) {
        j++;
        continue;
      }
      if (isReversePair(i, j, nums)) {
        ret.push(j);
      }
      j++;
    }
    cache[num] = ret.concat(skipedIndice);
    return ret;
  };
}
