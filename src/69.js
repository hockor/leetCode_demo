/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function(x) {
  if (x === 0) {
    return 0;
  }
  if (x === 1) {
    return 1;
  }
  let start = 1;
  let end = x;
  while (true) {
    if (start >= end) {
      if (end * end <= x) {
        return end;
      }
      return end - 1;
    }
    const mid = Math.floor((start + end) / 2);
    const tempResult = mid * mid;
    if (tempResult === x) {
      return mid;
    }
    if (tempResult > x) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }
};
