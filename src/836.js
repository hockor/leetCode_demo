/**
 * @param {number[]} rec1
 * @param {number[]} rec2
 * @return {boolean}
 */
var isRectangleOverlap = function(rec1, rec2) {
  const [x11, y11, x12, y12] = rec1;
  const [x21, y21, x22, y22] = rec2;
  const isValid = [rec1, rec2].every(isRect);
  if (!isValid) {
    return false;
  }
  return (
    isRangesOverlap([x11, x12], [x21, x22]) &&
    isRangesOverlap([y11, y12], [y21, y22])
  );
};

function isRangesOverlap(range1, range2) {
  const [min1, max1] = range1;
  const [min2, max2] = range2;
  if (max1 <= min2) {
    return false;
  }
  if (min1 >= max2) {
    return false;
  }
  return true;
}

function isRect(rec) {
  const [x1, y1, x2, y2] = rec;
  return x1 !== x2 && y1 !== y2;
}
