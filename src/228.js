/**
 * @param {number[]} nums
 * @return {string[]}
 */
var summaryRanges = function(nums) {
  const ret = [];
  for (let i = 0; i < nums.length; ) {
    const num = nums[i];
    let current = num;
    let shift = 1;
    let next = nums[i + shift];
    const consecutive = [num];
    while (typeof next === "number") {
      if (next === current + 1) {
        if (consecutive.length > 1) {
          consecutive.pop();
        }
        consecutive.push(next);
        current = next;
        shift++;
        next = nums[i + shift];
      } else {
        break;
      }
    }
    i += shift;
    ret.push(consecutive.join("->"));
  }
  return ret;
};
