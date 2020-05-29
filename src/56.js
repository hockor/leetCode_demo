/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
  if (intervals.length <= 1) {
    return intervals;
  }
  if (intervals.length === 2) {
    if (!canBeMerged(intervals[0], intervals[1])) {
      return intervals;
    }
    return mergeTwo(...intervals);
  }
  intervals.sort((intervalA, intervalB) => intervalA[0] - intervalB[0]);
  let intervalRef = intervals[0];
  const ret = [];
  for (let i = 1; i < intervals.length; i++) {
    const interval = intervals[i];
    if (canBeMerged(intervalRef, interval)) {
      [intervalRef] = mergeTwo(intervalRef, interval);
      continue;
    } else {
      ret.push(intervalRef);
      intervalRef = interval;
    }
  }
  ret.push(intervalRef);
  return ret;
};

function canBeMerged(interval1, interval2) {
  const [start1, end1] = interval1;
  const [start2, end2] = interval2;
  if (end1 < start2) {
    return false;
  }
  if (end2 < start1) {
    return false;
  }
  return true;
}

function mergeTwo(interval1, interval2) {
  const [start1, end1] = interval1;
  const [start2, end2] = interval2;
  const start = Math.min(start1, start2);
  const end = Math.max(end1, end2);
  return [[start, end]];
}
