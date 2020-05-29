/**
 * @param {number} n
 * @return {number}
 */
var waysToChange = function(n) {
  if (typeof cache[n] === "number") {
    return cache[n];
  }
  const saveAndReturn = (input, result) => {
    cache[input] = result;
    return result;
  };
  if (n <= 0) {
    return saveAndReturn(n, 0);
  }
  if (n < 5) {
    return saveAndReturn(n, 1);
  }
  if (n < 10) {
    return saveAndReturn(n, 2);
  }
  if (n === 10) {
    return saveAndReturn(n, 4);
  }
  if (n <= 25) {
    const prevNums = Array.from({ length: 10 }, (_, index) => {
      const offset = index + 1;
      return waysToChange(n - offset) + waysToChange(offset) - 1;
    });
    return saveAndReturn(n, Math.max(...prevNums));
  }
  const prevNums = Array.from({ length: 25 }, (_, index) => {
    const offset = index + 1;
    return waysToChange(n - offset) + waysToChange(offset) - 1;
  });
  return saveAndReturn(n, Math.max(...prevNums));
};

const cache = {};
