function deleteDuplicatesOld(head) {
  let node = head;
  if (!node) return head;
  let arr = [];
  while (node) {
    const last = arr.pop();
    if (last === undefined) {
      arr.push(node.val);
    } else if (node.val === last) {
      arr.push(last, node.val);
    } else {
      const deleteCount = computeRepeated(last, arr);
      if (deleteCount) {
        arr = arr.slice(0, 0 - deleteCount);
        arr.push(node.val);
      } else {
        arr.push(last, node.val);
      }
    }
    node = node.next;
  }
  if (!arr.length) {
    return null;
  }
  const last = arr.pop();
  const deleteCount = computeRepeated(last, arr);
  if (deleteCount) {
    arr = arr.slice(0, 0 - deleteCount);
  } else {
    arr.push(last);
  }
  let ret = null;
  let lastPointer = null;
  arr.forEach((val, index) => {
    const current = new ListNode(val);
    if (index === 0) {
      ret = current;
    } else {
      lastPointer.next = current;
    }
    lastPointer = current;
  });
  return ret;
}

function computeRepeated(c, arr) {
  let deleteCount = 0;
  for (let i = arr.length - 1; i >= 0; i--) {
    const item = arr[i];
    if (item !== c) {
      break;
    } else {
      deleteCount++;
    }
  }
  return deleteCount;
}

function deleteDuplicates(head) {
  if (!head) return null;
  let lastNewValNode = null;
  let lastNewValNodePrev = null;
  let last = head;
  let node = head.next;
  let ret = head;
  if (!node) return head;
  while (node) {
    if (node.val !== last.val) {
      if (!lastNewValNode) {
        if (ret !== last) {
          ret = node;
        } else {
          lastNewValNodePrev = last;
        }
      } else {
        if (lastNewValNode !== last) {
          if (!lastNewValNodePrev) {
            ret = node;
          } else {
            lastNewValNodePrev.next = node;
          }
        } else {
          lastNewValNodePrev = last;
        }
      }
      lastNewValNode = node;
    }
    last.next = node;
    last = node;
    node = node.next;
  }
  if (lastNewValNode !== last) {
    if (lastNewValNode === ret || !lastNewValNode) {
      return null;
    }
    if (lastNewValNodePrev) {
      lastNewValNodePrev.next = null;
    }
  }
  return ret;
}
