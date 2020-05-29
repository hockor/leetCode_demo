/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var rotateRight = function(head, k) {
  let len = 0;
  let last = null;
  let node = head;
  while (node) {
    len++;
    last = node;
    node = node.next;
  }
  const shift = k % len;
  if (!shift) {
    return head;
  }
  node = head;
  let count = 1;
  while (count < len - shift) {
    count++;
    node = node.next;
  }
  const ret = node.next;
  node.next = null;
  last.next = head;
  return ret;
};
