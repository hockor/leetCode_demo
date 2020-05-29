/**
 * @param {string} S
 * @param {number} K
 * @return {string}
 */
var decodeAtIndex = function(S, K) {
  const bufferArray = [];
  let total = 0;
  for (let char of S) {
    const isChar = isNaN(char);
    if (isChar) {
      if (bufferArray.length) {
        const lastChar = bufferArray.pop();
        if (isNaN(lastChar)) {
          bufferArray.push(`${lastChar}${char}`);
        } else {
          bufferArray.push(lastChar, char);
        }
      } else {
        bufferArray.push(char);
      }
      total++;
    } else {
      const repeatTime = Number(char);
      total *= repeatTime;
      const lastChar = bufferArray.pop();
      if (isNaN(lastChar)) {
        bufferArray.push(lastChar, repeatTime);
      } else {
        bufferArray.push(lastChar * repeatTime);
      }
    }
    if (total >= K) {
      return getCharAtIndex(K, bufferArray);
    }
  }
  return getCharAtIndex(K, bufferArray);
};

// ['a', 2, 'bc', 12]
// 13
// 12
// aabc
// 12 % 4 = 0
// a
// 15
// 14
// 14 % 4 = 2
//
// ['aabc'.repeat(12)]

function getCharAtIndex(index, bufferArray, total) {
  let arrayCache = ["", 1];
  if (index <= total) {
    let realIndex = index;
    for (let i = bufferArray.length - 1; i >= 0; i--) {
      const char = bufferArray[i];
      const isChar = isNaN(char);
      if (isChar) {
        // todo
      }
    }
  }

  for (let i = 0; i < bufferArray.length; i++) {
    const c = bufferArray[i];
    const isCChar = isNaN(c);
    const [buffer, repeat] = arrayCache;
    if (isCChar) {
      const newBufferLength = buffer.length * repeat + 1;
      if (newBufferLength === index) {
        return c;
      }
      arrayCache = [buffer.repeat(repeat) + c, 1];
    } else {
      const nextBufferLength = buffer.length * repeat * c;
      if (index <= nextBufferLength) {
        const indexInBuffer = (index - 1) % buffer.length;
        return buffer[indexInBuffer];
      }
      arrayCache = [buffer, repeat * c];
    }
  }
  // index > buffer.length
  const [buffer] = arrayCache;
  const indexInBuffer = (index - 1) % buffer.length;
  return buffer[indexInBuffer];
}
