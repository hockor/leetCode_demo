function grayCode(n) {
  if (n === 0) return [n];
  const len = 2 ** n;
  const ret = [new Array(n).fill(0)];
  for (let i = 0; i < len - 1; i++) {
    const last = ret.pop();
    ret.push(last);
    const next = nextNum(last, ret);
    if (next.length) {
      ret.push(next);
    }
  }
  return ret.map(arr => convert2Num(arr));
}

function nextNum(arr, existed) {
  const stringifiedExisted = existed.map(arr => arr.join(""));
  const ret = [];
  for (let i = 0; i < arr.length; i++) {
    const temp = arr.slice();
    temp[i] = Math.abs(arr[i] - 1);
    if (stringifiedExisted.every(stringArr => stringArr !== temp.join("")))
      return temp;
  }
  return ret;
}

function convert2Num(arr = []) {
  return arr
    .slice()
    .reverse()
    .reduce((acc, num, index) => acc + num * 2 ** index, 0);
}

/* 
100px -> 100 unit -> 200 dp -> 0.5unit/dp
100px -> 200 unit -> 200 dp -> 1unit/dp
100px -> 100 unit -> 200 dp -> (1unit/dp)


1 unit -> 2px
*/
