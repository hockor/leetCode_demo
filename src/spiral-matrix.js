/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
const unique = Symbol.for("unique");
var spiralOrder = function(matrix) {
  if (!matrix.length) {
    return [];
  }
  const len = matrix.length * matrix[0].length;
  let isRow = true;
  let changeCount = 0;
  let dir = 1;
  let row = 0;
  let col = 0;
  const ret = [];
  for (let i = 1; i <= len; i++) {
    const item = matrix[row][col];
    ret.push(item);
    matrix[row][col] = unique;
    if (isRow) {
      isRow = matrix[row].some(item => item !== unique);
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
      isRow = matrix.every(r => r[col] === unique);
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
