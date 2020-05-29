/**
 * @param {string} str
 * @return {number}
 */
var myAtoi = function(str) {
  const trimmedStr = str.trim();
  const match = /^[-+]?\d+/.exec(trimmedStr);
  if (!match) {
    return 0;
  }
  const numStr = match[0];
  const isNegative = numStr[0] === "-";
  const pureNumStr = numStr.replace(/^[-+]?0*/, "");
  if (isNegative) {
    if (isGt(negativeLimit, pureNumStr)) {
      return 0 - limit;
    } else {
      return Number(numStr);
    }
  }
  if (isGt(positiveLimit, pureNumStr)) {
    return limit - 1;
  }
  return Number(numStr);
};

const limit = 2 ** 31;
const negativeLimit = `${limit}`;
const positiveLimit = `${limit - 1}`;

const isGt = (base, num) => {
  if (num.length > base.length) {
    return true;
  }
  if (num.length < base.length) {
    return false;
  }
  for (let i = 0; i < base.length; i++) {
    const baseNum = base[i];
    const inputNum = num[i];
    if (Number(baseNum) > Number(inputNum)) {
      return false;
    }
    if (Number(baseNum < Number(inputNum))) {
      return true;
    }
  }
  return false;
};
