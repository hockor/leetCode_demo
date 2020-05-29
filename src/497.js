/**
 * @param {number[][]} rects
 */
var Solution = function(rects) {
  this.rects = rects;
  this.weights = rects.map(Solution.getArea);
  this.indexSliceArray = this.generateIndexSlice();
  this.totalLen = this.weights.reduce((acc, weight) => acc + weight);
  this.size = rects.length;
};

Solution.getArea = rect => {
  const [x1, y1, x2, y2] = rect;
  const width = x2 - x1 + 1;
  const height = y2 - y1 + 1;
  return width * height;
};

Solution.getRandom = max => {
  return Math.floor(Math.random() * max * 100000) % max;
};

Solution.prototype.generateIndexSlice = function() {
  let acc = 0;
  const ret = [];
  for (let weight of this.weights) {
    acc += weight;
    ret.push(acc);
  }
  return ret;
};

Solution.prototype.findIndexOfSlice = function(index) {
  for (let i = 0; i < this.indexSliceArray.length; i++) {
    const slice = this.indexSliceArray[i];
    if (index <= slice) {
      return i;
    }
  }
};

Solution.prototype.getPick = function(index) {
  const rect = this.rects[index];
  const total = this.weights[index];
  const randomIndex = Solution.getRandom(total);
  const [x1, y1, x2, y2] = rect;
  const colNums = x2 - x1 + 1;
  const rowNums = y2 - y1 + 1;
  const colIndex = randomIndex % colNums;
  const rowIndex = Math.ceil(randomIndex / colNums) % rowNums;
  return [x1 + colIndex, y1 + rowIndex];
};

/**
 * @return {number[]}
 */
Solution.prototype.pick = function() {
  const index = Solution.getRandom(this.totalLen);
  const sliceIndex = this.findIndexOfSlice(index);
  return this.getPick(sliceIndex);
};

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(rects)
 * var param_1 = obj.pick()
 */
