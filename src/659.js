/**
 * @param {number[]} nums
 * @return {boolean}
 */
var isPossible = function(nums) {
  const sc = new StackContainer();
  for (let num of nums) {
    sc.push(num);
  }
  return sc.container.every(stack => stack.length >= 3);
};

class StackContainer {
  constructor() {
    this.container = [];
    this.lastNumber = null;
  }

  push(number) {
    if (this.lastNumber === null) {
      this.container.push([number]);
    } else {
      const target = number - 1;
      const candidates = this.container.filter(stack => {
        const { length } = stack;
        const last = stack[length - 1];
        return last === target;
      });
      if (candidates.length === 1) {
        candidates[0].push(number);
      } else if (candidates.length === 0) {
        this.container.push([number]);
      } else {
        let index = 0;
        let pushed = false;
        while (index < candidates.length) {
          const stack = candidates[index];
          if (stack.length >= 3) {
            index++;
            continue;
          } else {
            stack.push(number);
            pushed = true;
            break;
          }
        }
        if (!pushed) {
          candidates[0].push(number);
        }
      }
    }
    this.lastNumber = number;
  }
}
