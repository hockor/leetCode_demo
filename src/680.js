/**
 * @param {string} s
 * @return {boolean}
 */
var validPalindrome = function(s) {
  function recursive(s, deleteCount = 0) {
    if (deleteCount > 1) {
      return false;
    }
    let startIndexRef = 0;
    let endIndexRef = s.length - 1;
    while (startIndexRef <= endIndexRef) {
      const startChar = s[startIndexRef];
      const endChar = s[endIndexRef];
      if (startChar === endChar) {
        startIndexRef++;
        endIndexRef--;
      } else {
        return (
          recursive(
            s.slice(0, startIndexRef) + s.slice(startIndexRef + 1),
            deleteCount + 1
          ) ||
          recursive(
            s.slice(0, endIndexRef) + s.slice(endIndexRef + 1),
            deleteCount + 1
          )
        );
      }
    }
    return true;
  }
  return recursive(s);
};
