/**
 * @param {number[][]} grid
 * @return {number}
 */
var surfaceArea = function(grid) {
  let rowArea = 0;
  let colArea = 0;
  let zArea = 0;
  for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
    const row = grid[rowIndex];
    for (let colIndex = 0; colIndex < row.length; colIndex++) {
      const pillar = row[colIndex];
      // z
      if (pillar !== 0) {
        zArea++;
      }
      const prevRow = grid[rowIndex - 1];
      // col
      if (rowIndex === 0) {
        colArea += pillar;
      } else {
        const pillarOnPrevRow = prevRow[colIndex];
        colArea += Math.abs(pillarOnPrevRow - pillar);
      }
      if (rowIndex === grid.length - 1) {
        colArea += pillar;
      }
      // row
      if (colIndex === 0) {
        rowArea += pillar;
      } else {
        const pillarOnPrevCol = row[colIndex - 1];
        rowArea += Math.abs(pillarOnPrevCol - pillar);
      }
      if (colIndex === row.length - 1) {
        rowArea += pillar;
      }
    }
  }
  return rowArea + colArea + zArea * 2;
};
