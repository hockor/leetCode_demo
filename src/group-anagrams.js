/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
  const sorted = strs.map(str =>
    str
      .split("")
      .sort()
      .join("")
  );
  const cache = {};
  for (let i = 0; i < sorted.length; i++) {
    const str = sorted[i];
    if (!cache[str]) {
      cache[str] = [];
    }
    cache[str].push(i);
  }
  return Object.values(cache).map(indexArr =>
    indexArr.map(index => strs[index])
  );
};
