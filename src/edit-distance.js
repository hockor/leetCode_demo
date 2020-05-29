/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function(word1, word2) {
  // every step is based on last step
  return calculate(word1.split(""), word2.split(""));
};

function calculate(arrA, arrB) {
  if (!arrA.length) {
    return arrB.length;
  }
  if (!arrB.length) {
    return arrA.length;
  }
  const ret = [];
  for (let i = 0; i < arrA.length; i++) {
    ret[i] = new Array(arrB.length).fill(0);
  }

  for (let j = 0; j < arrB.length; j++) {
    const charA = arrA[0];
    const charB = arrB[j];
    if (charA === charB) {
      ret[0][j] = j;
    } else if (j !== 0) {
      ret[0][j] = ret[0][j - 1] + 1;
    } else {
      ret[0][j] = 1;
    }
  }

  for (let i = 0; i < arrA.length; i++) {
    const charB = arrB[0];
    const charA = arrA[i];
    if (charA === charB) {
      ret[i][0] = i;
    } else if (i !== 0) {
      ret[i][0] = ret[i - 1][0] + 1;
    } else {
      ret[i][0] = 1;
    }
  }

  for (let i = 1; i < arrA.length; i++) {
    const charA = arrA[i];
    for (let j = 1; j < arrB.length; j++) {
      const charB = arrB[j];
      if (charA === charB) {
        ret[i][j] = Math.min(
          ret[i - 1][j] + 1,
          ret[i][j - 1] + 1,
          ret[i - 1][j - 1]
        );
      } else {
        ret[i][j] = Math.min(
          ret[i - 1][j] + 1,
          ret[i][j - 1] + 1,
          ret[i - 1][j - 1] + 1
        );
      }
    }
  }
  return ret[arrA.length - 1][arrB.length - 1];
}

// word1 = "intention", word2 = "execution"
