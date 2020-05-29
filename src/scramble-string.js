/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var isScramble = function(s1, s2) {
  if ([s1, s2].some(s => !s.length)) {
    return false;
  }
  if (s1 === s2) {
    return true;
  }
  if (s1.length !== s2.length) {
    return false;
  }
  if (!s1.length && !s2.length) {
    return true;
  }
  const chars1 = s1.split("");
  const chars2 = s2.split("");
  if (chars2.some(char => !s1.includes(char))) {
    return false;
  }
  if (chars1.some(char => !s2.includes(char))) {
    return false;
  }
  const len = s1.length;
  for (
    let firstHalfLength = 1;
    firstHalfLength < s1.length;
    firstHalfLength++
  ) {
    const firstHalfOfS1 = s1.slice(0, firstHalfLength);
    const firstHalfOfS2 = s2.slice(0, firstHalfLength);
    const secondHalfOfS1 = s1.slice(firstHalfLength);
    const secondHalfOfS2 = s2.slice(firstHalfLength);
    const reversedFisrtHalfOfS2 = s2.slice(0, len - firstHalfLength);
    const reversedSecondHalfOfS2 = s2.slice(-firstHalfLength);
    const isOrdered = isStrMadeBySameChars(firstHalfOfS1, firstHalfOfS2);
    const isReversed = isStrMadeBySameChars(
      firstHalfOfS1,
      reversedSecondHalfOfS2
    );
    if (!isOrdered && !isReversed) {
      continue;
    }
    if (isOrdered) {
      const isFirstHalfCompat = isScramble(firstHalfOfS1, firstHalfOfS2);
      const result =
        isFirstHalfCompat && isScramble(secondHalfOfS1, secondHalfOfS2);
      if (result) {
        return true;
      } else {
        continue;
      }
    }
    const isFirstHalfCompat = isScramble(firstHalfOfS1, reversedSecondHalfOfS2);
    const result =
      isFirstHalfCompat && isScramble(secondHalfOfS1, reversedFisrtHalfOfS2);
    if (result) {
      return result;
    }
  }
  return false;
};

function isStrMadeBySameChars(s1, s2) {
  if (s1.length !== s2.length) {
    return false;
  }
  const cache = {};
  for (const char of s1) {
    const start = typeof cache[char] === "number" ? cache[char] : -1;
    const index = s2.indexOf(char, start + 1);
    if (index < 0) {
      return false;
    }
    cache[char] = index;
  }
  return true;
}
