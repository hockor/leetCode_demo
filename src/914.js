/**
 * @param {number[]} deck
 * @return {boolean}
 */
var hasGroupsSizeX = function(deck) {
  if (!deck.length) {
    return false;
  }
  const cache = {};
  for (let num of deck) {
    if (typeof cache[num] !== "number") {
      cache[num] = 1;
    } else {
      cache[num]++;
    }
  }
  const counts = Object.values(cache);
  const evens = [];
  const odds = [];
  for (let num of counts) {
    if (num % 2 === 0) {
      evens.push(num);
    } else {
      odds.push(num);
    }
  }
  if (odds.length === 0) {
    return true;
  }
  const minOdd = Math.min(...odds);
  if (minOdd === 1) {
    return false;
  }
  const numbers = decomposeNum(minOdd);
  return numbers.some(number => counts.every(count => count % number === 0));
};

function decomposeNum(num) {
  let base = num;
  const ret = [];
  // skip 1
  for (let i = 2; i <= base; i++) {
    if (base % i === 0) {
      const hasIncluded = ret.some(number => i % number === 0);
      if (!hasIncluded) {
        ret.push(i);
        base = base / i;
      }
    }
  }
  return ret;
}
