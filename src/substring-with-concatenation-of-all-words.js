/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */
var findSubstring = function(s, words) {
  if (!words.length || !s.length) {
    return [];
  }
  const uniqueWords = [...new Set(words)];
  if (uniqueWords.some(c => !s.includes(c))) {
    return [];
  }
  const totalLen = words.reduce((acc, word) => acc + word.length, 0);
  const allPotentialStarts = uniqueWords.reduce((acc, word) => {
    const indexes = [];
    let lastIndex = 0;
    while (true) {
      const index = s.indexOf(word, lastIndex);
      if (index > -1 && index + totalLen <= s.length) {
        indexes.push(index);
        lastIndex = index + 1;
      } else {
        break;
      }
    }
    if (indexes.length) {
      acc.push(indexes);
    }

    return acc;
  }, []);
  const tempResult = allPotentialStarts
    .map(starts => {
      return starts.filter(start => {
        const strSlice = s.slice(start, start + totalLen);
        return match(strSlice, words);
      });
    })
    .filter(starts => starts.length)
    .reduce((acc, starts) => {
      return acc.concat(starts);
    }, []);
  return [...new Set(tempResult)];
};

function match(str, words = []) {
  if (!words.every(word => str.includes(word))) {
    return false;
  }
  const strArr = words.reduce((acc, word, index) => {
    const { length } = word;
    acc.push(str.slice(index * length, index * length + length));
    return acc;
  }, []);
  const wordsCopy = words.slice();
  while (strArr.length) {
    const part = strArr.pop();
    const index = wordsCopy.indexOf(part);
    if (index > -1) {
      wordsCopy[index] = null;
      continue;
    } else {
      return false;
    }
  }
  return true;
}
