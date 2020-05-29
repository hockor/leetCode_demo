/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
  if (target <= 0 || !candidates.length) {
    return [];
  }
  if (candidates.length === 1) {
    return combination1(candidates, target);
  }
  if (candidates.length === 2) {
    return combination2(candidates, target);
  }
  let ret = [];
  for (let i = 0; i < candidates.length; i++) {
    const num = candidates[i];
    ret = ret.concat(combination1([num], target));
    const count = Math.floor(target / num);
    if (count === 0) {
      continue;
    }
    const restCandidates = candidates.slice(i + 1);
    for (let j = 1; j <= count; j++) {
      const newTarget = target - j * num;
      const append = combinationSum(restCandidates, newTarget);
      if (append.length) {
        const prefix = new Array(j).fill(num);
        ret = ret.concat(append.map(arr => prefix.concat(arr)));
      }
    }
  }
  return ret;
};

function combination1(candidates, target) {
  const [num] = candidates;
  if (target % num === 0) {
    return [new Array(target / num).fill(num)];
  }
  return [];
}

function combination2(candidates, target) {
  const ret = [];
  const [num1, num2] = candidates;
  const left1 = target % num1;
  const left2 = target % num2;
  if (left1 === 0) {
    ret.push(new Array(target / num1).fill(num1));
  }
  if (left2 === 0) {
    ret.push(new Array(target / num2).fill(num2));
  }

  const count = Math.floor(target / num1);
  if (count === 0) {
    return ret;
  }
  for (let i = 1; i <= count; i++) {
    const targetLeft = target - i * num1;
    if (targetLeft > 0 && targetLeft % num2 === 0) {
      const prefix = new Array(i).fill(num1);
      ret.push(prefix.concat(new Array(targetLeft / num2).fill(num2)));
    }
  }

  return ret;
}
