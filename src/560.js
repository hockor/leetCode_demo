/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function(nums, k) {
  const sumCache = new SumCache(nums);
  return sumCache.sum(k, nums.length - 1);
};

class SumCache {
  constructor(nums) {
    this.nums = nums;
    this.sums = new Map();
    this.sumResult = new Map();
  }

  get length() {
    return this.nums.length;
  }

  getResultKey(targetNumber, endIndex) {
    return Symbol.for(`${targetNumber}@${endIndex}`);
  }

  sum(targetNumber, endIndex) {
    if (endIndex >= this.length) {
      return 0;
    }
    if (endIndex < 0) {
      return 0;
    }
    if (endIndex === 0) {
      return this.nums[0] === targetNumber ? 1 : 0;
    }
    const previousResult = this.sum(targetNumber, endIndex - 1);
    let currentResult = this.countSum(targetNumber, endIndex);
    const result = previousResult + currentResult;
    return result;
  }

  countSum(targetNumber, endIndex) {
    const prevIndex = endIndex - 1;
    if (prevIndex < 0) {
      return 0;
    }
    let sums;
    let count = 0;
    if (this.sums.has(endIndex)) {
      return this.sums.get(endIndex).filter(num => num === targetNumber);
    }
    if (this.sums.has(prevIndex)) {
      const num = this.nums[endIndex];
      const prevSums = this.sums.get(prevIndex);
      sums = prevSums.map(item => {
        const ret = item + num;
        if (ret === targetNumber) {
          count++;
        }
        return ret;
      });
      sums.push(num);
      if (num === targetNumber) {
        count++;
      }
      this.sums.delete(prevIndex);
    } else {
      sums = [];
      let index = endIndex;
      let sum = 0;
      while (index >= 0) {
        sum += this.nums[index];
        if (sum === targetNumber) {
          count++;
        }
        sums.push(sum);
        index--;
      }
    }

    this.sums.set(endIndex, sums);
    return count;
  }
}
