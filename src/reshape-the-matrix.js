/**
 * @param {number[][]} nums
 * @param {number} r
 * @param {number} c
 * @return {number[][]}
 */
var matrixReshape = function(nums, r, c) {
  const flat = [];

  for (let row of nums) {
    flat.push(...row);
  }
  if (r * c !== flat.length) {
    return nums;
  }
  const ret = [];
  for (let i = 0; i < flat.length; i += c) {
    const slice = flat.slice(i, i + c);
    ret.push(slice);
  }
  return ret;
};
