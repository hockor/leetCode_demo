/**
 * @param {string} s
 * @return {number}
 */
var findTheLongestSubstring = function(s) {
  const parts = [];
  const glues = new Map();
  const listKey = Symbol();
  glues.set(listKey, []);
  let startIndexRef = 0;
  let endIndexRef = 0;
  while (endIndexRef < s.length) {
    const char = s[endIndexRef];
    if (dict[char]) {
      // others
      if (!glues.has(char)) {
        glues.set(char, [endIndexRef]);
      } else {
        const occur = glues.get(char);
        occur.push(endIndexRef);
      }
      glues.get(listKey).push(endIndexRef);
      parts.push([startIndexRef, endIndexRef]);
      startIndexRef = endIndexRef + 1;
      endIndexRef = startIndexRef;
    } else {
      if (endIndexRef === s.length - 1) {
        parts.push([startIndexRef, s.length]);
      }
      endIndexRef++;
    }
  }
  let max = 0;
  const glueMap = new Map();
  let originIndex = 0;
  let origin;
  let indexRef = 0;
  while (indexRef < parts.length && originIndex < parts.length) {
    origin = parts[originIndex][0];
    const [start, end] = parts[indexRef];
    const offset = end - start;
    max = Math.max(offset, max);
    const glueChar = s[end];
    if (!glueMap.size) {
      max = Math.max(max, end - origin);
    }
    // the end
    if (!glueChar) {
      break;
    }
    if (glueMap.has(glueChar)) {
      glueMap.delete(glueChar);
      if (!glueMap.size) {
        const newOffset = end - origin + 1;
        max = Math.max(newOffset, max);
      } else {
        const glueEntries = Array.from(glueMap);
        for (let i = glueEntries.length - 1; i >= 0; i--) {
          const [char, index] = glueEntries[i];
          const occur = glues.get(char);
          const lastOccurIndex = occur[occur.length - 1];
          // won't have another glueChar to cancel it out
          if (lastOccurIndex === index) {
            glueMap.clear();
            // slide origin
            if (occur.length > 1) {
              const allGlueIndice = glues.get(listKey);

              let start = allGlueIndice.indexOf(occur[1]);
              const prevIndex = Math.max(0, start - 1);
              originIndex = allGlueIndice[prevIndex] + 1;
              while (start < allGlueIndice.length) {
                const glueCharIndex = allGlueIndice[start];
                const glueCharToBeAdded = s[glueCharIndex];
                if (!glueMap.has(glueCharToBeAdded)) {
                  glueMap.set(glueCharToBeAdded, glueCharIndex);
                } else {
                  glueMap.delete(glueCharToBeAdded);
                }
                start++;
              }
              // // how to update glueMap
              // console.log(
              //   occur[1],
              //   glueIndex,
              //   prevIndex,
              //   originIndex,
              //   allGlueIndice,
              //   char
              // );
            } else {
              originIndex = lastOccurIndex + 1;
              // update glueMap
              const copiedGlueEntries = glueEntries.slice(i + 1);
              for (let [copiedGlueChar, copiedIndex] of copiedGlueEntries) {
                glueMap.set(copiedGlueChar, copiedIndex);
              }
              console.log("only one", char, originIndex);
            }

            break;
          }
        }
      }
    } else {
      glueMap.set(glueChar, end);
    }
    indexRef++;
  }
  return max;
};

let dict = {
  a: true,
  e: true,
  i: true,
  o: true,
  u: true
};

let input = "eleetminicoworoep";
findTheLongestSubstring(input);
