/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var middleNode = function(head) {
  if (!head) {
    return head;
  }
  let node = head;
  const arr = [node];
  while (node.next) {
    arr.push(node.next);
    node = node.next;
  }
  const halfIndex = Math.ceil((arr.length - 1) / 2);
  return arr[halfIndex];
};
