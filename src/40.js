/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
var getLeastNumbers = function(arr, k) {
  const ret = [];
  for (let num of arr) {
    if (ret.length < k) {
      addWithOrder(ret, num);
      continue;
    }
    const { [k - 1]: last } = ret;
    if (num < last) {
      ret.pop();
      addWithOrder(ret, num);
    }
  }
  return ret;
};

function addWithOrder(arr, num) {
  if (!arr.length) {
    arr.push(num);
    return arr;
  }
  const beforeIndex = arr.findIndex(item => item > num);
  if (beforeIndex > -1) {
    arr.splice(beforeIndex, 0, num);
  } else {
    arr.push(num);
  }
  return arr;
}

/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
var getLeastNumbers = function(arr, k) {
  const ret = [];
  let max = 0;
  for (const num of arr) {
    if (ret.length < k) {
      ret.push(num);
      if (ret.length === k) {
        max = Math.max(...ret);
      }
      continue;
    }
    if (num < max) {
      const index = ret.findIndex(item => item === max);
      ret[index] = num;
      max = Math.max(...ret);
    }
  }
};
