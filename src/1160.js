/**
 * @param {string[]} words
 * @param {string} chars
 * @return {number}
 */
var countCharacters = function(words, chars) {
  const charsArr = chars.split("");
  let ret = 0;
  for (let word of words) {
    let matched = true;
    let wordCopied = word;
    const matchedIndex = [];
    while (word.length) {
      const wordChar = word[0];
      word = word.slice(1);
      const index = charsArr.indexOf(wordChar);
      if (index > -1) {
        matchedIndex.push(index);
        charsArr[index] = null;
      } else {
        matched = false;
        break;
      }
    }

    matchedIndex.forEach(index => {
      charsArr[index] = chars[index];
    });

    ret += matched ? wordCopied.length : 0;
  }
  return ret;
};
