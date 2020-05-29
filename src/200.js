/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
  const cache = {};
  const ret = new Set();
  for (let row = 0; row < grid.length; row++) {
    const rowArray = grid[row];
    for (let col = 0; col < rowArray.length; col++) {
      const item = rowArray[col];
      if (item === "0") {
        continue;
      }
      const node = new Node([col, row]);
      cache[`${row},${col}`] = node;
      let top = "0";
      let left = "";
      if (row > 0) {
        top = grid[row - 1][col];
      }
      if (col > 0) {
        left = grid[row][col - 1];
      }
      const hasTop = top === "1";
      const hasLeft = left === "1";
      const topKey = `${row - 1},${col}`;
      const leftKey = `${row},${col - 1}`;
      if (!hasTop && !hasLeft) {
        ret.add(node);
      } else if (hasTop && !hasLeft) {
        const topNode = cache[topKey];
        topNode.append(node);
      } else if (!hasTop && hasLeft) {
        const leftNode = cache[leftKey];
        leftNode.append(node);
      } else {
        const topNode = cache[topKey];
        const leftNode = cache[leftKey];
        const hasSameRoot = topNode.root === leftNode.root;
        if (!hasSameRoot) {
          ret.delete(leftNode.root);
          topNode.root.append(leftNode.root);
        }
        topNode.append(node);
      }
    }
  }
  return ret.size;
};

class Node {
  constructor(position) {
    [this.x, this.y] = position;
    this.children = [];
    this.parent = null;
    this.level = 0;
  }

  remove(child) {
    const index = this.children.findIndex(c => c === child);
    if (index > -1) {
      this.children.splice(index, 1);
    }
  }

  append(child) {
    if (this.children.includes(child)) {
      return;
    }
    this.children.push(child);
    child.parent = this;
    child.level = this.level + 1;
    child.updateChildrenLevel();
  }

  updateChildrenLevel() {
    this.children.forEach(child => {
      child.level = this.level + 1;
      if (child.children.length) {
        child.updateChildrenLevel();
      }
    });
  }

  get root() {
    if (!this.parent) {
      return this;
    }
    let parent = this.parent;
    while (parent) {
      if (parent.parent) {
        parent = parent.parent;
      } else {
        break;
      }
    }
    return parent;
  }
}
