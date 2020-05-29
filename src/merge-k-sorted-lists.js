/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {
  let ret = null;
  let last = null;
  while (true) {
    if (lists.every(node => node === null)) {
      break;
    }
    let min = Infinity;
    let minIndex = Infinity;
    for (let i = 0; i < lists.length; i++) {
      const start = lists[i];
      if (!start) {
        continue;
      }
      if (start.val < min) {
        min = start.val;
        minIndex = i;
      }
    }

    if (!ret) {
      ret = lists[minIndex];
      last = ret;
    } else {
      last.next = lists[minIndex];
      last = lists[minIndex];
    }
    lists[minIndex] = lists[minIndex].next;
  }
  return ret;
};
