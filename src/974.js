/**
 * @param {number[]} A
 * @param {number} K
 * @return {number}
 */
var subarraysDivByK = function(A, K) {
  let count = 0;
  let start = 0;
  let sum = 0;
  const modMap = new Map();
  // O(n)
  while (start < A.length) {
    const num = A[start];
    sum += num;
    const mod = ((sum % K) + K) % K;
    if (mod === 0) {
      count++;
    }
    if (modMap.has(mod)) {
      const oldCount = modMap.get(mod);
      modMap.set(mod, oldCount + 1);
      count += oldCount;
    } else {
      modMap.set(mod, 1);
    }
    start++;
  }
  return count;
};
