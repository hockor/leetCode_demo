/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
  const { length: len1 } = nums1;
  const { length: len2 } = nums2;
  const total = len1 + len2;
  let half = Math.ceil(total / 2);
  const isEven = total % 2 === 0;
  half = isEven ? half + 1 : half;
  let num1Pointer = 0;
  let num2Pointer = 0;
  let counter = 0;
  let mid = [];
  const updateMid = saveMid(2);
  while (counter < half) {
    let num1 = nums1[num1Pointer];
    let num2 = nums2[num2Pointer];
    num1 = typeof num1 === "number" ? num1 : Infinity;
    num2 = typeof num2 === "number" ? num2 : Infinity;
    if (num1 < num2) {
      num1Pointer++;
      mid = updateMid(num1);
    } else if (num2 < num1) {
      num2Pointer++;
      mid = updateMid(num2);
    } else {
      num1Pointer++;
      num2Pointer++;
      mid = updateMid(num1);
      if (counter === half - 1) {
        break;
      }
      mid = updateMid(num2);
      counter++;
    }
    counter++;
  }

  if (isEven) {
    return mid.reduce((acc, num) => acc + num) / mid.length;
  }
  return mid[mid.length - 1];
};

function saveMid(count) {
  const mid = [];
  return function getMid(num) {
    if (mid.length >= count) {
      mid.shift();
    }
    mid.push(num);
    return mid;
  };
}
