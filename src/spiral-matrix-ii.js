/**
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function(n) {
  let isRow = true;
  let changeCount = 0;
  let dir = 1;
  let row = 0;
  let col = 0;
  const ret = [];
  for (let row = 0; row < n; row++) {
    ret[row] = new Array(n).fill(0);
  }
  for (let i = 1; i <= n ** 2; i++) {
    ret[row][col] = i;
    if (isRow) {
      isRow = ret[row].some(item => item === 0);
      if (isRow) {
        col += dir;
      } else {
        changeCount++;
        if (changeCount % 2 == 0) {
          dir = 0 - dir;
        }
        row += dir;
      }
    } else {
      isRow = ret.every(r => r[col]);
      if (!isRow) {
        row += dir;
      } else {
        changeCount++;
        if (changeCount % 2 == 0) {
          dir = 0 - dir;
        }
        col += dir;
      }
    }
  }
  return ret;
};

/*
 * 1,  2,  3,  4
 * 12, 13, 14, 5
 * 11, 16, 15, 6
 * 10, 9,  8,  7
 */
