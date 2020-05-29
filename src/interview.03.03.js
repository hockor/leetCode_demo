/**
 * @param {number} cap
 */
var StackOfPlates = function(cap) {
  this.cap = cap;
  this.set = [];
};

/**
 * @param {number} val
 * @return {void}
 */
StackOfPlates.prototype.push = function(val) {
  if (this.cap === 0) {
    return;
  }
  if (!this.set.length) {
    this.set.push([]);
  }
  const { length } = this.set;
  let array = this.set[length - 1];
  if (array.length === this.cap) {
    array = [];
    this.set.push(array);
  }
  array.push(val);
};

/**
 * @return {number}
 */
StackOfPlates.prototype.pop = function() {
  if (this.cap === 0) {
    return -1;
  }
  const last = this.set.pop();
  if (!last) {
    return -1;
  }
  const result = last.pop();
  if (last.length) {
    this.set.push(last);
  }
  return result === void 0 ? -1 : result;
};

/**
 * @param {number} index
 * @return {number}
 */
StackOfPlates.prototype.popAt = function(index) {
  if (this.cap === 0) {
    return -1;
  }
  if (index < 0) {
    return -1;
  }
  if (index > this.set.length - 1) {
    return -1;
  }
  const stack = this.set[index];
  const result = stack.pop();
  if (!stack.length) {
    this.set.splice(index, 1);
  }
  return result === void 0 ? -1 : result;
};

/**
 * Your StackOfPlates object will be instantiated and called as such:
 * var obj = new StackOfPlates(cap)
 * obj.push(val)
 * var param_2 = obj.pop()
 * var param_3 = obj.popAt(index)
 */

/**
  * ["StackOfPlates", "pop", "popAt", "push", "popAt", "popAt", "pop", "pop", "push", "popAt", "pop", "push", "push", "pop", "popAt", "popAt", "push", "push", "push", "popAt", "pop", "pop", "pop", "popAt", "pop", "push", "popAt", "push", "push", "popAt", "push", "push", "pop", "popAt", "push", "pop", "popAt", "push", "pop", "push", "pop", "popAt", "popAt", "pop", "push", "push", "pop", "popAt", "push", "push", "pop", "pop", "popAt"]
[[3], [], [1], [1], [2], [2], [], [], [9], [3], [], [51], [20], [], [2], [0], [35], [1], [19], [3], [], [], [], [1], [], [36], [1], [19], [3], [3], [15], [44], [], [3], [46], [], [0], [42], [], [31], [], [0], [2], [], [10], [49], [], [1], [14], [50], [], [], [3]]
  */
