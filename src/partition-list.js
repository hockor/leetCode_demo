/*
 * @lc app=leetcode id=86 lang=javascript
 *
 * [86] Partition List
 *
 * https://leetcode.com/problems/partition-list/description/
 *
 * algorithms
 * Medium (36.41%)
 * Total Accepted:    155.1K
 * Total Submissions: 425.1K
 * Testcase Example:  '[1,4,3,2,5,2]\n3'
 *
 * Given a linked list and a value x, partition it such that all nodes less
 * than x come before nodes greater than or equal to x.
 *
 * You should preserve the original relative order of the nodes in each of the
 * two partitions.
 *
 * Example:
 *
 *
 * Input: head = 1->4->3->2->5->2, x = 3
 * Output: 1->2->2->4->3->5
 *
 *
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
function partition(head, x) {
  let node = head;
  let small = null;
  let smallLast = null;
  let big = null;
  let bigLast = null;
  while (node) {
    const currentNode = new ListNode(node.val);

    if (currentNode.val < x) {
      if (!small) {
        small = currentNode;
      } else {
        smallLast.next = currentNode;
      }
      smallLast = currentNode;
    } else {
      if (!big) {
        big = currentNode;
      } else {
        bigLast.next = currentNode;
      }
      bigLast = currentNode;
    }
    node = node.next;
  }
  if (smallLast) {
    smallLast.next = big;
  } else {
    small = big;
  }

  return small;
}
