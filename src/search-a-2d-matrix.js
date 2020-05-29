/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function(matrix, target) {
  if (!matrix.length) {
    return false;
  }
  if (!matrix[0].length) {
    return false;
  }
  if (target < matrix[0][0]) {
    return false;
  }
  if (target > matrix[matrix.length - 1].slice(-1)[0]) {
    return false;
  }
  let row = 0;
  let start = 0;
  let end = matrix.length - 1;

  while (true) {
    if (end < start) {
      return false;
    }
    let mid = Math.floor((start + end) / 2);
    const midRow = matrix[mid];
    const midLast = midRow[midRow.length - 1];
    if (target > midLast) {
      start = mid + 1;
    } else if (target < midLast) {
      if (target < midRow[0]) {
        end = mid - 1;
      } else if (target > midRow[0]) {
        row = mid;
        break;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }

  return matrix[row].includes(target);
};
