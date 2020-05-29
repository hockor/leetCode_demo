/*
 * @lc app=leetcode.cn id=371 lang=javascript
 *
 * [371] 两整数之和
 */

// @lc code=start
/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
var getSum = function (a, b) {
  var temp
  while (a != 0) {
    temp = (a & b) << 1
    b = a ^ b
    a = temp
  }
  return b
}
// @lc code=end
