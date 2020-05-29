/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
  let index = 0;
  let ret = 0;
  while (index < height.length) {
    const h = height[index];
    if (h === 0) {
      index++;
      continue;
    }

    // should be next max index
    const nextIndex = findNextIndex(height.slice(index + 1), h) + index + 1;
    if (nextIndex <= index + 1) {
      index++;
      continue;
    } else {
      const baseH = Math.min(h, height[nextIndex]);
      for (let i = index + 1; i < nextIndex; i++) {
        const tempH = height[i];
        ret += baseH - tempH;
      }
      index = nextIndex;
    }
  }
  return ret;
};

function findNextIndex(arr = [], h = 0) {
  let max = -Infinity;
  let ret = -1;
  for (let i = 0; i < arr.length; i++) {
    const num = arr[i];
    if (num > h) {
      return i;
    }
    if (num > max) {
      max = num;
      ret = i;
    }
  }
  return ret;
}
