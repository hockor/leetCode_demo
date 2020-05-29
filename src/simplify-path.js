/**
 * @param {string} path
 * @return {string}
 */
var simplifyPath = function(path) {
  const normalizedPath = stripDelimiter(path);
  const pathArr = normalizedPath.split("/").filter(c => c !== "." && c !== "");
  const ret = [];
  const up = "..";
  for (let i = 0; i < pathArr.length; i++) {
    const c = pathArr[i];
    if (c !== up) {
      ret.push(c);
    } else {
      const { length } = ret;
      const last = ret[length - 1];
      if (last && last !== up) {
        ret.pop();
      } else {
        ret.push(c);
      }
    }
  }
  while (true) {
    const first = ret.shift();
    if (first === up) {
      continue;
    } else {
      ret.unshift(first);
      break;
    }
  }
  return `/${ret.join("/")}`;
};

function stripDelimiter(path, delimiter = "/") {
  const match = new RegExp(`${delimiter}+`, "g");
  return path.replace(match, delimiter);
}
