/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function(s) {
  if (s.length < 4 && s.length > 12) {
    return [];
  }
  if (s.length === 12) {
    const arr = [];
    for (let i = 0; i < s.length; i += 3) {
      const slice = s.slice(i, i + 3);
      if (isValid(slice)) {
        arr.push(slice);
      } else {
        return [];
      }
    }
    return [arr.join(".")];
  }
  const pool = [];
  for (let i = 1; i <= 3; i++) {
    if (isValid(s.slice(0, i))) {
      pool.push([s.slice(0, i)]);
    }
  }
  const ret = new Set();
  while (pool.length) {
    const num = pool.shift();
    const count = num.length;
    const totalLen = num.reduce((acc, item) => acc + item.length, 0);
    for (let i = 1; i <= 3; i++) {
      const slice = s.slice(totalLen, totalLen + i);
      if (isValid(slice)) {
        if (count === 3 && totalLen + i === s.length) {
          ret.add(num.concat(slice).join("."));
        } else if (count < 3) {
          pool.push(num.concat(slice));
        }
      }
    }
  }
  return [...ret];
};

function isValid(str) {
  if (str !== "0" && /^0/.test(str)) {
    return false;
  }
  return Number(str) <= 255;
}
