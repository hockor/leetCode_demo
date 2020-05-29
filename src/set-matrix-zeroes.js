/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function(matrix) {
  const cols = [];
  for (let row = 0; row < matrix.length; row++) {
    let isRowZero = false;
    const rowArr = matrix[row];
    if (!rowArr) {
      return;
    }
    for (let col = 0; col < rowArr.length; col++) {
      const item = rowArr[col];
      if (item === 0) {
        isRowZero = true;
        if (!cols.includes(col)) {
          cols.push(col);
        }
      }
    }
    if (isRowZero) {
      matrix[row] = matrix[row].map(() => 0);
    }
  }

  matrix.forEach(row => {
    if (row[0] === 0) {
      return;
    }
    cols.forEach(col => {
      row[col] = 0;
    });
  });
};
