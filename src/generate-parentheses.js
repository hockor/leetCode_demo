/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
  const total = 2 ** (n - 1);
  const ret = [];
  ret.push({
    head: 1,
    tail: 0,
    array: "("
  });

  let count = 0;
  while (count < total) {
    const tempLen = ret.length;
    for (let i = 0; i < tempLen; i++) {
      const { head, tail, array } = ret[i];
      if (head === n && tail === n) {
        count++;
        continue;
      }
      if (head > tail) {
        ret[i] = {
          head,
          tail: tail + 1,
          array: array + ")"
        };
        if (head < n) {
          ret.push({
            head: head + 1,
            tail,
            array: array + "("
          });
        }
      } else {
        ret[i] = {
          head: head + 1,
          tail,
          array: array + "("
        };
      }
    }
  }
  return ret.map(item => item.array);
};

console.log("ggogogo");
