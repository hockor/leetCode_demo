/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function(num1, num2) {
  if (num1 == 0 || num2 == 0) {
    return "0";
  }
  const len = num1.length;
  const retArr = [];
  for (let i = len - 1; i >= 0; i--) {
    const num = num1[i];
    retArr.push(times(num, num2));
  }
  return retArr.reduce((acc, item, index) => {
    const currentItem = item + new Array(index).fill("0").join("");
    acc = add(acc, currentItem);
    return acc;
  }, "0");
};

function times(lessTen, num2) {
  let ret = "";
  let toAdd = 0;
  const len = num2.length;
  for (let i = len - 1; i >= 0; i--) {
    const num = num2[i];
    let tempRet = Number(num) * Number(lessTen) + toAdd;
    toAdd = Math.floor(tempRet / 10);
    tempRet = tempRet % 10;
    ret = tempRet + ret;
  }
  if (toAdd) {
    return toAdd + ret;
  }
  return ret;
}

function add(num1, num2) {
  let toAdd = 0;
  let ret = "";
  if (num1 == 0) {
    return num2;
  }
  if (num2 == 0) {
    return num1;
  }
  const len = num1.length;
  for (let i = 1; i <= len; i++) {
    const index1 = len - i;
    const index2 = num2.length - i;
    const item1 = num1[index1];
    const item2 = num2[index2];
    if (item2 === undefined) {
      return add(num1.slice(0, index1 + 1), `${toAdd}`) + ret;
    }
    let tempRet = Number(item1) + Number(item2) + toAdd;
    toAdd = Math.floor(tempRet / 10);
    tempRet = tempRet % 10;
    ret = tempRet + ret;
  }
  const sameLength = num1.length === num2.length;
  if (sameLength) {
    if (toAdd) {
      return toAdd + ret;
    }
    return ret;
  }
  return add(num2.slice(0, 0 - num1.length), `${toAdd}`) + ret;
}
