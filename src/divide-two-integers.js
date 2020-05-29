/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */
var divide = function(dividend, divisor) {
  if (dividend === 0) {
    return 0;
  }
  const areBothPositive = dividend > 0 && divisor > 0;
  const areBothNegative = dividend < 0 && divisor < 0;
  const isSameSign = areBothNegative || areBothPositive;
  const [posDividend, posDivisor] = [dividend, divisor].map(Math.abs);
  if (posDividend < posDivisor) {
    return 0;
  }
  if (isSameSign) {
    const ret = getResult(posDividend, posDivisor);
    return Math.min(ret, 2 ** 31 - 1);
  } else {
    const ret = 0 - getResult(posDividend, posDivisor);
    return Math.max(ret, 0 - 2 ** 31);
  }
};

function getResult(dividend, divisor) {
  if (divisor === 1) {
    return dividend;
  }
  let loopCount = 0;
  let count = 0;
  let left = dividend;
  let tempDivisor = divisor;
  while (true) {
    if (left < divisor) {
      return count;
    }

    if (left - tempDivisor > tempDivisor) {
      left -= tempDivisor;
      tempDivisor += tempDivisor;
      count += 2 ** loopCount;
    } else {
      left -= divisor;
      count++;
    }
    loopCount++;
  }
}
