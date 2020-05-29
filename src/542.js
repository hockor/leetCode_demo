/**
 * @param {number[][]} matrix
 * @return {number[][]}
 */
var updateMatrix = function(matrix) {
  const ret = Array.from(matrix, () => {
    return [];
  });
  const findDistance = getFindDistance();
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      ret[row][col] = findDistance(row, col, matrix);
    }
  }
  return ret;
};

function getFindDistance(row, col, matrix) {
  const getKey = (row, col) => `${row},${col}`;
  const cache = {
    hash: {},
    save(row, col, value) {
      const key = getKey(row, col);
      cache.hash[key] = value;
    },
    get(row, col) {
      const key = getKey(row, col);
      return cache.hash[key];
    }
  };

  const processHash = {
    hash: {},
    add(row, col) {
      const key = getKey(row, col);
      if (processHash.hash[key]) {
        return;
      }
      processHash.hash[key] = true;
    },
    has(row, col) {
      const key = getKey(row, col);
      return processHash.hash[key] === true;
    },
    remove(row, col) {
      const key = getKey(row, col);
      processHash.hash[key] = false;
    }
  };
  return function findDistance(row, col, matrix) {
    const rowMax = matrix.length - 1;
    const colMax = matrix[0].length - 1;
    if (row > rowMax || col > colMax) {
      return Infinity;
    }
    if (row < 0 || col < 0) {
      return Infinity;
    }
    // do not save 0 to save space
    const num = matrix[row][col];
    if (num === 0) {
      return 0;
    }
    const cachedResult = cache.get(row, col);
    if (typeof cachedResult === "number") {
      if (processHash.has(row, col)) {
        return cachedResult;
      }
    }
    cache.save(row, col, Infinity);
    const keys = [
      [row, col],
      [row - 1, col],
      [row + 1, col],
      [row, col - 1],
      [row, col + 1]
    ];
    keys.forEach(pair => processHash.add(...pair));
    const result = Math.min(
      findDistance(row - 1, col, matrix) + 1,
      findDistance(row + 1, col, matrix) + 1,
      findDistance(row, col - 1, matrix) + 1,
      findDistance(row, col + 1, matrix) + 1
    );
    cache.save(row, col, result);
    keys.forEach(pair => processHash.remove(...pair));
    return result;
  };
}
