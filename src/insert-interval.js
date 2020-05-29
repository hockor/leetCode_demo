/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function(intervals, newInterval) {
  if (!intervals.length) {
    return [newInterval];
  }
  const [newStart, newEnd] = newInterval;
  let start = -1;
  let end = -1;
  for (let i = 0; i < intervals.length; i++) {
    const [iStart, iEnd] = intervals[i];
    if (start === -1 && iEnd >= newStart) {
      start = i;
    }
    if (newEnd >= iStart && newEnd < iEnd) {
      end = i;
    } else if (newEnd >= iEnd) {
      end = i;
    }
  }

  if (start > end) {
    return [
      ...intervals.slice(0, start),
      newInterval,
      ...intervals.slice(start)
    ];
  }

  if ([start, end].every(num => num !== -1)) {
    intervals[start][0] = Math.min(newStart, intervals[start][0]);
    intervals[end][1] = Math.max(newEnd, intervals[end][1]);
    return [
      ...intervals.slice(0, start),
      [intervals[start][0], intervals[end][1]],
      ...intervals.slice(end + 1)
    ];
  } else {
    if (newEnd < intervals[0][0]) {
      return [newInterval, ...intervals];
    }
    return [...intervals, newInterval];
  }
};
