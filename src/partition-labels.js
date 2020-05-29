/**
 * @param {string} S
 * @return {number[]}
 */
var partitionLabels = function(S) {
  const indexMap = {};
  for (let char of S) {
    if (!indexMap[char]) {
      indexMap[char] = S.lastIndexOf(char);
    }
  }
  let index = 0;
  const ret = [];
  while (index < S.length) {
    const char = S[index];
    const endIndex = indexMap[char];
    if (endIndex === index) {
      ret.push(1);
      index++;
    } else {
      let stopIndex = endIndex;
      let indexRef = index + 1;
      while (indexRef < stopIndex) {
        const c = S[indexRef];
        const cIndex = indexMap[c];
        if (cIndex > stopIndex) {
          stopIndex = cIndex;
        }
        indexRef++;
      }
      ret.push(stopIndex - index + 1);
      index = stopIndex + 1;
    }
  }
  return ret;
};
