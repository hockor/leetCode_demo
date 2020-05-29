/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalSquare = function(matrix) {
  if (!matrix.length) {
    return 0;
  }
  if (!matrix[0].length) {
    return 0;
  }
  const ret = [];
  let max = 0;
  for (let row = 0; row < matrix.length; row++) {
    const firstColOfRow = +matrix[row][0];
    ret[row] = [firstColOfRow];
    max = Math.max(max, firstColOfRow);
  }
  for (let col = 0; col < matrix[0].length; col++) {
    const num = +matrix[0][col];
    ret[0][col] = num;
    max = Math.max(max, num);
  }
  for (let row = 1; row < matrix.length; row++) {
    const rowArr = matrix[row];
    for (let col = 1; col < matrix[0].length; col++) {
      const num = +rowArr[col];
      if (num === 0) {
        // cannot form a new square
        ret[row][col] = 0;
        continue;
      } else {
        const leftTop = ret[row - 1][col - 1];
        if (leftTop === 0) {
          ret[row][col] = 1;
        } else {
          // can combine with leftTop
          const top = ret[row - 1][col];
          const left = ret[row][col - 1];
          const compareArr = [left, top];
          if (compareArr.every(item => item >= leftTop)) {
            const length = leftTop ** 0.5;
            const areaForThisPoint = (length + 1) ** 2;
            ret[row][col] = areaForThisPoint;
          } else if (compareArr.every(item => item === 0)) {
            ret[row][col] = 1;
          } else {
            const leftLength = left ** 0.5;
            const topLength = top ** 0.5;
            const minLength = Math.min(leftLength, topLength);
            ret[row][col] = (minLength + 1) ** 2;
          }
        }
        max = Math.max(max, ret[row][col]);
      }
    }
  }
  return max;
};

const a = [
  ["0", "0", "0", "1"],
  ["1", "1", "0", "1"],
  ["1", "1", "1", "1"],
  ["1", "1", "1", "1"],
  ["0", "1", "1", "1"]
];

// [["0","0","0","1"],["1","1","0","1"],["1","1","1","1"],["0","1","1","1"],["0","1","1","1"]]
