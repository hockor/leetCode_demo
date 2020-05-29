/*
 * @lc app=leetcode.cn id=7 lang=javascript
 *
 * [7] 整数反转
 *
 * https://leetcode-cn.com/problems/reverse-integer/description/
 *
 * algorithms
 * Easy (33.69%)
 * Likes:    1709
 * Dislikes: 0
 * Total Accepted:    281.8K
 * Total Submissions: 836.6K
 * Testcase Example:  '123'
 *
 * 给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。
 *
 * 示例 1:
 *
 * 输入: 123
 * 输出: 321
 *
 *
 * 示例 2:
 *
 * 输入: -123
 * 输出: -321
 *
 *
 * 示例 3:
 *
 * 输入: 120
 * 输出: 21
 *
 *
 * 注意:
 *
 * 假设我们的环境只能存储得下 32 位的有符号整数，则其数值范围为 [−2^31,  2^31 − 1]。请根据这个假设，如果反转后整数溢出那么就返回
 * 0。
 *
 */

// @lc code=start
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
  let temp = x
  const max = 2 ** 31 - 1
  const min = 0 - 2 ** 31
  let _x = Math.abs(x)
  _x = String(_x)
    .split('')
    .reverse()
    .join('')
  _x = Number(_x)

  if (temp > 0) {
    if (_x >= max) {
      // 注意这里要加上=号，不包括在边界中。。。坑爹
      return 0
    } else {
      return _x
    }
  } else {
    if (0 - _x <= min) {
      return 0
    } else {
      return 0 - _x
    }
  }
}

// 网上另一个解法
/* var reverse = function(x) {
   var resultArr = [];
   var intToStr = x.toString();
   for(var i = intToStr.length-1;i > 0;i--){
       resultArr.push(intToStr[i]);
   }
   if(intToStr[0] == "-"){
       resultArr.unshift("-");
   }
   resultArr.push(intToStr[0]);
   var resultNum = parseInt(resultArr.join(""));
   if(resultNum <= Math.pow(-2,31) || resultNum >= Math.pow(2,31) - 1 ){
       return 0;
   }
   return resultNum;
}; */

// @lc code=end
