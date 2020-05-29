/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {string[][]}
 */
var findLadders = function(beginWord, endWord, wordList) {
  if (!wordList.includes(endWord)) {
    return [];
  }
  const len = beginWord.length;
  // for one letter
  if (len === 1) {
    return [[beginWord, endWord]];
  }

  const forwardList = new List([new Character(beginWord)]);
  let forwardIndex = 0;
  const record = new Record();
  while (forwardIndex < forwardList.length) {
    const forwardChar = forwardList.at(forwardIndex++);
    for (let word of wordList) {
      if (isOneLetterDifference(word, forwardChar.value)) {
        // could use flyweight here
        const char = new Character(word);
        char.setParent(forwardChar);
        if (word === endWord) {
          record.push(char);
          break;
        }
        const existedChar = forwardList.find(char);
        if (!forwardChar.isDescendentOf(existedChar)) {
          // TODO
          forwardList.push(char);
        }
      }
    }
  }
  const minLen = Math.min(...record.list.map(l => l.length));
  return record.list.filter(l => l.length === minLen);
};

const isOneLetterDifference = (word1, word2) => {
  if (word1 === word2) {
    return false;
  }
  let count = 0;
  for (let i = 0; i < word1.length; i++) {
    const letter1 = word1[i];
    const letter2 = word2[i];
    if (letter1 !== letter2) {
      count++;
    }
    if (count > 1) {
      return false;
    }
  }
  return true;
};

class Character {
  constructor(value) {
    this.value = value;
    this.parent = null;
  }

  setParent(parent) {
    if (!Character.isValidCharater(parent)) {
      return;
    }
    this.parent = parent;
  }

  isDescendentOf(char) {
    if (!Character.isValidCharater(char)) {
      return false;
    }
    let parent = this.parent;
    while (parent) {
      if (parent === char) {
        return true;
      }
      parent = parent.parent;
    }
    return false;
  }

  static isValidCharater(char) {
    return char instanceof Character;
  }
}

class List {
  constructor(initialValue = []) {
    this.list = initialValue;
  }

  at(index) {
    return this.list[index];
  }

  push(char) {
    this.list.push(char);
  }

  includes(char) {
    return this.list.some(c => c.value === char.value);
  }

  find(char) {
    return this.list.find(c => c.value === char.value);
  }

  shift() {
    return this.list.shift();
  }

  get length() {
    return this.list.length;
  }
}

class Record {
  constructor() {
    this.list = [];
    this.set = new Set();
  }

  push(char) {
    const arr = [];
    let charRef = char;
    while (charRef) {
      arr.unshift(charRef.value);
      charRef = charRef.parent;
    }
    const str = arr.join(",");
    if (this.set.has(str)) {
      return;
    }
    this.set.add(str);
    this.list.push(arr);
  }
}
