/**
 * @param {character[][]} board
 * @return {number}
 */
var numRookCaptures = function(board) {
  const rPos = [];
  for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
    const row = board[rowIndex];
    for (let colIndex = 0; colIndex < row.length; colIndex++) {
      const item = row[colIndex];
      if (item === "R") {
        rPos.push(rowIndex, colIndex);
        break;
      }
    }
    if (rPos.length > 0) {
      break;
    }
  }
  let count = 0;
  const [x, y] = rPos;
  const row = board[x].filter(item => item !== ".");
  const col = board.map(rowItem => rowItem[y]).filter(item => item !== ".");
  count += countP(row);
  count += countP(col);
  return count;
};

function countP(arr) {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (item === "R") {
      if (arr[i - 1] === "p") {
        count++;
      }
      if (arr[i + 1] === "p") {
        count++;
      }
      break;
    }
  }
  return count;
}
