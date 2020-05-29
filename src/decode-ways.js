function numDecodings(s) {
  if (s[0] == 0) return 0;
  const len = s.length;
  if (len <= 1) return len;
  const arr = s.split("");
  let ret = { [arr[0]]: 1 };
  for (let i = 1; i < arr.length; i++) {
    const c = arr[i];
    const prevC = arr[i - 1];
    const num = Number(`${prevC}${c}`);
    const temp = ret;
    const tempRet = {
      [num]: 0,
      [c]: 0
    };
    if (num === 0) return 0;
    if (num <= 26) {
      Object.entries(temp).forEach(([last, len]) => {
        if (last === prevC) {
          tempRet[num] += len;
        }
        if (c != 0) {
          tempRet[c] += len;
        }
      });
    } else {
      if (c == 0) return 0;
      Object.entries(temp).forEach(([last, len]) => {
        tempRet[c] += len;
      });
    }
    ret = tempRet;
  }
  return Object.values(ret).reduce((acc, count) => acc + count, 0);
}
