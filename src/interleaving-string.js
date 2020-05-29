/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 */
var isInterleave = function(s1, s2, s3) {
  if (s3.length !== s1.length + s2.length) {
    return false;
  }
  for (let i = 0; i < s3.length; i++) {
    const char = s3[i];
    const s1First = s1[0];
    const s2First = s2[0];
    if (s1First !== s2First) {
      if (char === s1First) {
        s1 = s1.slice(1);
      } else if (char === s2First) {
        s2 = s2.slice(1);
      } else {
        return false;
      }
    } else {
      // aa ab bb
      if (char !== s1First) {
        return false;
      }
      return (
        isInterleave(s1.slice(1), s2, s3.slice(i + 1)) ||
        isInterleave(s1, s2.slice(1), s3.slice(i + 1))
      );
    }
  }
  return true;
};
