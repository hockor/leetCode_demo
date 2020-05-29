/**
 * @param {string} s
 * @return {string}
 */
var decodeString = function(s) {
  const stack = [];
  const nodeList = [];
  let index = 0;
  const openChar = "[";
  const closeChar = "]";
  while (index < s.length) {
    const char = s[index];
    if (char === openChar) {
      stack.push(openChar);
    }
    if (/\d/.test(char)) {
    }
    if (/[a-z]/.test(char)) {
    }
  }
};

class Node {
  constructor(val, repeat) {
    this.val = val;
    this.repeat = repeat;
    this.children = [];
  }

  addChild(node) {
    this.children.push(node);
  }
}
