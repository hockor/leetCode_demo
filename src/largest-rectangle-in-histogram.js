/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function(heights) {
  let max = 0;
  for (let i = 0; i < heights.length; i++) {
    const area = calculateArea(heights, i, max);
    max = Math.max(max, area);
  }
  return max;
};

function calculateArea(heights, index, baseLine) {
  const start = heights[index];
  const { length } = heights;
  const count = length - index + 1;
  if (start * count <= baseLine) {
    return baseLine;
  }
  let max = start;
  let minH = start;
  for (let i = index + 1; i < heights.length; i++) {
    const height = heights[i];
    minH = Math.min(minH, height);
    if (minH * count < max) {
      break;
    }
    const area = minH * (i - index + 1);
    max = Math.max(area, max);
  }
  return max;
}

// [2,1,5,6,2,3]
