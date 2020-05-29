/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function(nums) {
  if (nums.length === 1) {
    return true;
  }
  const end = nums.length - 1;
  const stepsList = getStepsList();
  stepsList.push(0);
  while (stepsList.length > 0) {
    const stepIndex = stepsList.shift();
    const steps = next(stepIndex, nums);
    if (steps.length === 0) {
      continue;
    }
    if (steps.includes(end)) {
      return true;
    }
    steps.forEach(stepIndex => {
      if (stepsList.has(stepIndex)) {
        return;
      }
      stepsList.push(stepIndex);
    });
  }
  return false;
};

const getStepsList = () => {
  const stepsList = {
    list: [],
    hash: {},
    get length() {
      return stepsList.list.length;
    },
    shift() {
      return stepsList.list.shift();
    },
    has(key) {
      return stepsList.hash[key] === true;
    },
    push(key) {
      if (stepsList.has(key)) {
        return stepsList.length;
      }
      stepsList.hash[key] = true;
      return stepsList.list.push(key);
    }
  };
  return stepsList;
};

function next(index, nums) {
  const steps = nums[index];
  return Array.from({ length: steps }, (_, i) => index + i + 1);
}
