/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
var numDistinct = function(s, t) {
  let index = -1;
  let store = new Store();
  let childStore = new Store();
  for (let i = 0; i < t.length; i++) {
    const char = t[i];
    index = s.indexOf(char, index + 1);
    if (index === -1) {
      return 0;
    }
    while (index > -1) {
      if (i !== 0) {
        for (let [parentIndex, count] of store) {
          if (index <= parentIndex) {
            continue;
          }
          childStore.save(index, count);
        }
      } else {
        store.save(index);
      }
      index = s.indexOf(char, index + 1);
    }
    if (i !== 0) {
      store.clear();
      const temp = store;
      store = childStore;
      childStore = temp;
    }
    index = store.min;
  }

  return store.size;
};

class Store {
  pool = {};
  min = Infinity;
  max = -Infinity;
  size = 0;
  save(index, count = 1) {
    this.min = Math.min(this.min, index);
    this.max = Math.max(this.max, index);
    this.size += count;
    if (!this.pool[index]) {
      this.pool[index] = count;
    } else {
      this.pool[index] += count;
    }
  }
  clear() {
    this.pool = {};
    this.min = Infinity;
    this.max = -Infinity;
    this.size = 0;
  }
  *[Symbol.iterator]() {
    for (let [index, count] of Object.entries(this.pool)) {
      yield [index, count];
    }
  }
}
