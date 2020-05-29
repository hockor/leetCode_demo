function findIndex(board, c) {
  const indexes = [];
  for (let row = 0; row < board.length; row++) {
    const rowArr = board[row];
    for (let col = 0; col < rowArr.length; col++) {
      const item = rowArr[col];
      if (item === c) {
        indexes.push([row, col]);
      }
    }
  }
  return indexes;
}

function find(board, word) {
  const wordArr = word.split("");
  const indexes = [];
  for (let c of wordArr) {
    const result = findIndex(board, c);
    if (!result.length) {
      return false;
    }
    indexes.push(result);
  }
  let base = indexes[0];
  for (let col = 1; col < wordArr.length; col++) {
    const currentIndex = indexes[col];
    base = currentIndex.filter(dot =>
      base.some(baseDot => isConnected([baseDot, dot]))
    );
    if (!base.length) return false;
  }
  return !!base.length;
}

function isConnected(dots) {
  const [dot1, dot2] = dots;
  const [row1, col1] = dot1;
  const [row2, col2] = dot2;
  return row1 === row2 || col1 === col2;
}
