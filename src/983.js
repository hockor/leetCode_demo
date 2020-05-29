/**
 * @param {number[]} days
 * @param {number[]} costs
 * @return {number}
 */
var mincostTickets = function(days, costs) {
  const { length } = days;
  const lastDay = days[length - 1];
  const costArray = [0];
  for (let i = 1; i <= lastDay; i++) {
    const oneAgo = Math.max(0, i - 1);
    const sevenAgo = Math.max(0, i - 7);
    const thirtyAgo = Math.max(0, i - 30);
    if (days.includes(i)) {
      costArray[i] = Math.min(
        costArray[oneAgo] + costs[0],
        costArray[sevenAgo] + costs[1],
        costArray[thirtyAgo] + costs[2]
      );
    } else {
      costArray[i] = costArray[i - 1];
    }
  }

  return costArray[costArray.length - 1];
};
