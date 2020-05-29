/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
  const array1 = listToArray(l1);
  const array2 = listToArray(l2);
  const ret = addArray(array1, array2);
  ret.reverse();
  return arrayToList(ret);
};

function addArray(array1, array2) {
  let len = Math.max(array1.length, array2.length) - 1;
  let toAdd = 0;
  const ret = [];
  while (len >= 0) {
    const item1 = toNumber(array1.pop());
    const item2 = toNumber(array2.pop());
    const sum = item1 + item2 + toAdd;
    toAdd = sum >= 10 ? Math.floor(sum / 10) : 0;
    const newItem = +`${sum}`.slice(-1);
    ret.push(newItem);
    len--;
  }
  if (toAdd !== 0) {
    return [...ret, toAdd];
  }
  return ret;
}

function toNumber(input) {
  if (typeof input === "number") {
    return input;
  }
  if (isNaN(input)) {
    return Boolean(input) ? 1 : 0;
  }
  return Number(input);
}

/**
 * @param {ListNode} list
 * @return {Array}
 */
function listToArray(list) {
  const ret = [];
  let node = list;
  while (node) {
    ret.push(node.val);
    node = node.next;
  }
  return ret;
}

function arrayToList(array) {
  let ret = null;
  let ref = null;
  for (let i = 0; i < array.length; i++) {
    const prevNode = ref;
    ref = new ListNode(array[i]);
    if (i === 0) {
      ret = ref;
    } else {
      prevNode.next = ref;
    }
  }
  return ret;
}
