var getPermutation = function(n, k) {
  let availableNumber = new Array(n).fill(0).map((_, index) => index + 1);
  let restK = k;
  let index = 1;
  const restNumber = [];
  while (index <= n) {
    const countForRest = count(n - index);
    const times = Math.floor(restK / countForRest);
    if (times === 0) {
      index++;
      restNumber.push(availableNumber.shift());
      continue;
    }
    const tempRestK = restK % countForRest;

    if (tempRestK) {
      index++;
      const toBePushed = availableNumber[times];
      availableNumber.splice(times, 1);
      restNumber.push(toBePushed);
      restK = tempRestK;
    } else {
      const toBePushed = availableNumber[times - 1];
      availableNumber.splice(times - 1, 1);
      restNumber.push(toBePushed, ...availableNumber.reverse());
      break;
    }
  }
  return restNumber.join("");
};

const countCache = {};
function count(num) {
  if (num in countCache) {
    return countCache[num];
  }

  if (num <= 1) {
    return 1;
  }

  return num * count(num - 1);
}
