/**
 * @param {number} N
 * @return {number}
 */
var binaryGap = function(N) {
  const binary = N.toString(2);
  let lastOneIndex = -1;
  let ret = 0;
  for (let i = 0; i < binary.length; i++) {
    const number = binary[i];
    if (number === "1") {
      if (lastOneIndex > -1) {
        ret = Math.max(i - lastOneIndex, ret);
      }
      lastOneIndex = i;
    }
  }
  return ret;
};
