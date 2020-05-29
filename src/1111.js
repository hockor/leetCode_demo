/**
 * @param {string} seq
 * @return {number[]}
 */
var maxDepthAfterSplit = function(seq) {
  let buffer = [];

  const ret = [];
  let lastIndex = 0;
  let lastPushedIndex = -Infinity;
  for (let i = 0; i < seq.length; i++) {
    const char = seq[i];
    if (char === "(") {
      buffer.push(i);
    } else {
      const index = buffer.pop();
      let indexToPush = lastIndex;
      // if conclusive, switch array to push
      // if not conclusive, push to the same array won't increase depth
      if (index < lastPushedIndex) {
        indexToPush = (lastIndex + 1) % 2;
      }

      ret[index] = indexToPush;
      ret[i] = indexToPush;
      lastPushedIndex = index;
      lastIndex = indexToPush;
    }
  }
  return ret;
};
