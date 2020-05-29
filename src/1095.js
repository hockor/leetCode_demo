/**
 * // This is the MountainArray's API interface.
 * // You should not implement it, or speculate about its implementation
 * function MountainArray() {
 *     @param {number} index
 *     @return {number}
 *     this.get = function(index) {
 *         ...
 *     };
 *
 *     @return {number}
 *     this.length = function() {
 *         ...
 *     };
 * };
 */

/**
 * @param {number} target
 * @param {MountainArray} mountainArr
 * @return {number}
 */
var findInMountainArray = function(target, mountainArr) {
  const length = mountainArr.length();
  const first = mountainArr.get(0);
  const last = mountainArr.get(length - 1);
  if (first > target && last > target) {
    return -1;
  }
  let startIndex = 0;
  let endIndex = length - 1;

  function search(sIndex, eIndex) {
    let startIndex = sIndex;
    let endIndex = eIndex;
    let midIndex = Math.floor((startIndex + endIndex) / 2);
    if (startIndex < 0 || midIndex < 0 || endIndex < 0) {
      return -1;
    }
    if (startIndex > endIndex) {
      return -1;
    }
    if (startIndex === endIndex) {
      return mountainArr.get(startIndex) === target ? startIndex : -1;
    }
    const start = mountainArr.get(startIndex);
    const end = mountainArr.get(endIndex);
    const mid = mountainArr.get(midIndex);
    if (startIndex + 1 === endIndex) {
      if (start === target) {
        return startIndex;
      }
      if (end === target) {
        return endIndex;
      }
      return -1;
    }

    function biSearch(startIndex, endIndex, midIndex) {
      const resultInFirstHalf = search(startIndex, midIndex);
      if (resultInFirstHalf !== -1) {
        return resultInFirstHalf;
      }
      return search(midIndex, endIndex);
    }
    if (mid === Math.max(start, mid, end)) {
      return biSearch(startIndex, endIndex, midIndex);
    } else if (mid < end) {
      // asc
      if (target >= mid) {
        return search(midIndex, endIndex);
      } else {
        return search(startIndex, midIndex);
      }
    } else {
      // dsc
      if (target >= mid) {
        return search(startIndex, midIndex);
      } else {
        return search(midIndex, endIndex);
      }
    }
  }

  return search(startIndex, endIndex);
};
