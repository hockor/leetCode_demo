/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalRectangle = function(matrix) {
  let max = 0;
  if (!matrix.length) {
    return max;
  }
  const ret = [];
  const rows = matrix.length;
  const cols = matrix[0].length;
  for (let i = 0; i < rows; i++) {
    ret[i] = new Array(cols).fill([0, 0]);
  }
  for (let i = 0; i < cols; i++) {
    const firstRow = matrix[0];
    if (+firstRow[i] === 0) {
      ret[0][i] = [0, 0];
    } else if (i >= 1) {
      const x = ret[0][i - 1][0] + 1;
      ret[0][i] = [x, 1];
    } else {
      ret[0][i] = [1, 1];
    }
    max = Math.max(max, ret[0][i][0]);
  }
  for (let i = 0; i < rows; i++) {
    if (+matrix[i][0] === 0) {
      ret[i][0] = [0, 0];
    } else if (i >= 1) {
      const y = ret[i - 1][0][1] + 1;
      ret[i][0] = [1, y];
    } else {
      ret[i][0] = [1, 1];
    }
    max = Math.max(max, ret[i][0][1]);
  }

  // maybe trace back?
  for (let row = 1; row < rows; row++) {
    for (let col = 1; col < cols; col++) {
      const current = +matrix[row][col];
      if (current === 0) {
        ret[row][col] = [0, 0];
        continue;
      } else {
        const top = ret[row - 1][col];
        const left = ret[row][col - 1];
        let x = 1;
        let y = 1;
        if (top[1] !== 0) {
          y = top[1] + 1;
        }
        if (left[0] !== 0) {
          x = left[0] + 1;
        }
        ret[row][col] = [x, y];
        // for width = 1
        max = Math.max(max, x, y);
        for (let start = col - 1; start > col - x; start--) {
          const width = col - start + 1;
          const heights = ret[row].slice(start, col + 1).map(([_, y]) => y);
          const height = Math.min(...heights);
          max = Math.max(max, width * height);
        }
      }
    }
  }

  return max;
};

// focus on the right bottom
