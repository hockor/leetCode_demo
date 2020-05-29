/**
 * @param {number} m
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var movingCount = function(m, n, k) {
  let counter = 0;
  const isReachable = getIsReachable();
  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      if (isReachable(col, row, m, n, k)) {
        console.log(col, row);
        counter++;
      }
    }
  }
  return counter;
};

function sum(x, y) {
  const xStr = `${x}`.split("");
  const yStr = `${y}`.split("");
  const str = xStr.concat(yStr);
  return str.map(item => Number(item)).reduce((acc, item) => acc + item, 0);
}

function getKey(x, y) {
  return [x, y].join(",");
}

function getIsReachable() {
  const cache = {};
  return function isReachable(x, y, m, n, k) {
    const key = getKey(x, y);
    if (cache[key]) {
      return true;
    }
    if (cache[key] === false) {
      return false;
    }
    if (sum(x, y) > k) {
      cache[key] = false;
      return false;
    }
    const prevKeys = [];
    if (x - 1 > 0) {
      prevKeys.push([x - 1, y]);
    }
    if (y - 1 > 0) {
      prevKeys.push([x, y - 1]);
    }
    if (x + 1 < n) {
      prevKeys.push([x + 1, y]);
    }
    if (y + 1 < m) {
      prevKeys.push([x, y + 1]);
    }
    if (!prevKeys.length) {
      cache[key] = true;
      return true;
    }
    for (const keyPair of prevKeys) {
      const result = isReachable(...keyPair, m, n, k);
      if (result) {
        cache[key] = result;
        return true;
      }
    }
    cache[key] = false;
    return false;
  };
}
