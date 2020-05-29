/**
 * @param {string[]} words
 * @param {number} maxWidth
 * @return {string[]}
 */
var fullJustify = function(words, maxWidth) {
  let index = 0;
  let rowStartIndex = 0;
  let currentLen = 0;
  const ret = [];
  while (index <= words.length) {
    const isLast = index === words.length;
    if (isLast) {
      const candidates = words.slice(rowStartIndex, index);
      const candidatesStr = candidates.reduce((acc, w, i) => {
        if (i === 0) {
          return `${acc}${w}`;
        }
        return `${acc} ${w}`;
      }, "");
      ret.push(
        candidatesStr +
          new Array(maxWidth - candidatesStr.length).fill(" ").join("")
      );
      break;
    }

    const word = words[index];
    const { length } = word;
    // 1 for space
    currentLen += currentLen === 0 ? length : 1 + length;
    const isOverLength = currentLen > maxWidth;

    if (isOverLength) {
      const wordCount = index - rowStartIndex;
      const candidates = words.slice(rowStartIndex, index);
      const totalLen = candidates.reduce((acc, w) => acc + w.length, 0);
      if (wordCount > 1) {
        const minSpace = Math.floor((maxWidth - totalLen) / (wordCount - 1));
        const restSpace = (maxWidth - totalLen) % (wordCount - 1);
        const row = candidates.reduce((acc, w, i) => {
          if (i === 0) {
            return `${acc}${w}`;
          }
          let space = minSpace;
          if (restSpace && i <= restSpace) {
            space++;
          }
          return `${acc}${new Array(space).fill(" ").join("")}${w}`;
        }, "");
        ret.push(row);
      } else {
        const prevWord = words[index - 1];
        ret.push(
          prevWord + new Array(maxWidth - prevWord.length).fill(" ").join("")
        );
      }
      currentLen = 0;
      rowStartIndex = index;
    } else {
      index++;
    }
  }
  return ret;
};
