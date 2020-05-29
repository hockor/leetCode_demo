/**
 * @param {number} n
 * @param {number} m
 * @return {number}
 */
var lastRemaining = function(n, m) {
  let arr = Array.from({ length: n }, (_, i) => i);
  let count = n;
  let index = 0;
  while (count > 1) {
    let endPoint = index + m - 1;
    if (endPoint >= count) {
      endPoint = endPoint % count;
    }
    arr.splice(endPoint, 1);
    index = endPoint;
    count--;
  }
  return arr[0];
};
