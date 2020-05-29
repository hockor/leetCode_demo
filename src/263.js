/**
 * @param {number} num
 * @return {boolean}
 */
var isUgly = function(num) {
  if (num <= 0) {
    return false;
  }
  let left = num;
  while (!targets.includes(left)) {
    if (left === 1) {
      return true;
    }
    const devider = targets.find(target => left % target === 0);
    if (!devider) {
      return false;
    }
    left = left / devider;
  }
};

const targets = [2, 3, 5];
