/**
 * @param {string} s
 * @return {number}
 */
var longestPalindrome = function(s) {
  const cache = {};
  for (let char of s) {
    if (typeof cache[char] !== "number") {
      cache[char] = 1;
    } else {
      cache[char] += 1;
    }
  }
  const lengthArr = Object.values(cache);
  const oddArr = lengthArr.filter(len => len % 2 === 1);
  const evenArr = lengthArr.filter(len => len % 2 === 0);
  const evenLength = evenArr.reduce((acc, num) => acc + num, 0);
  const oddLength = oddArr.reduce((acc, num) => acc + num - 1, 0);
  // odd could be center
  const compensateForOdd = oddArr.length > 0 ? 1 : 0;
  return evenLength + oddLength + compensateForOdd;
};
