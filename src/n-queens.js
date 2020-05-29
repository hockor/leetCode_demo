/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function(n) {
  if (n === 0) {
    return [];
  }
  if (n === 1) {
    return ["Q"];
  }
  const allRows = new Array(n).fill(0).map((_, index) => index);
  const ret = fillNWithList(n, allRows);
  return ret.map(rows => {
    return rows.map(col => {
      const arr = new Array(n).fill(".");
      arr[col] = "Q";
      return arr.join("");
    });
  });
};

function getPotentialNodes(existedList, list) {
  const nextRow = existedList.length;
  return existedList.reduce((acc, existedCol, existedRow) => {
    return acc.filter(col => {
      const isSameCol = col === existedCol;
      const isOnLine =
        Math.abs(col - existedCol) === Math.abs(nextRow - existedRow);
      return !isSameCol && !isOnLine;
    });
  }, list);
}

function fillNWithList(n, list, stack = []) {
  const potentialList = getPotentialNodes(stack, list);
  if (!potentialList.length || n <= 0) {
    return [[]];
  }
  if (n === 1) {
    return potentialList.map(item => [item]);
  }
  let ret = [];

  for (let num of potentialList) {
    const newStack = [...stack, num];
    const tempRet = fillNWithList(n - 1, list, newStack).map(arr => [
      num,
      ...arr
    ]);
    ret = ret.concat(tempRet);
  }
  return ret.filter(arr => arr.length === n);
}
