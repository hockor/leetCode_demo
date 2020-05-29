/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function(s) {
  const stack = [];
  let ret = 0;
  let temp = 0;
  const toAddStack = [];
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c === "(") {
      stack.push(c);
      toAddStack.push(0);
      continue;
    }
    if (c === ")") {
      const { length, [length - 1]: last } = stack;
      if (!last) {
        ret = Math.max(ret, temp);
        temp = 0;
        toAddStack.length = 0;
        stack.length = 0;
        continue;
      }
      if (last === "(") {
        stack.pop();
        if (!stack.length) {
          temp = temp + 2 + toAddStack.reduce((acc, num) => acc + num);
          toAddStack.length = 0;
        } else {
          for (let i = toAddStack.length - 1; i >= 0; i--) {
            const toAdd = toAddStack[i];
            if (toAdd === 0) {
              toAddStack[i] = 2;
              break;
            }
          }
        }
      }
    }
  }
  const toAddParts = toAddStack
    .join("")
    .split("0")
    .map(str => str.length * 2);

  return Math.max(ret, Math.max(...toAddParts), temp);
};

// "(()()(())(((()"
