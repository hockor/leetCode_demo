/**
 * @param {string[]} votes
 * @return {string}
 */
var rankTeams = function(votes) {
  const statistic = [];
  const teams = votes[0].split("");
  const rankObj = teams.reduce((acc, team) => {
    acc[team] = 0;
    return acc;
  }, {});
  for (let i = 0; i < teams.length; i++) {
    statistic.push({ ...rankObj });
  }
  for (let vote of votes) {
    for (let rank = 0; rank < vote.length; rank++) {
      const team = vote[rank];
      statistic[rank][team]++;
    }
  }
  const result = [];
  const rank0 = statistic[0];
  const rank0Entries = Object.entries(rank0);
  for (let team of rank0Entries) {
    add(result, team, 0, statistic);
  }
  return result.map(([team]) => team).join("");
};

function add(arr, team, rank, statistic) {
  if (!arr.length) {
    return arr.push(team);
  }
  arr.push(team);
  const { length } = arr;
  let count = length - 1;
  while (count >= 1) {
    const currentTeam = arr[count];
    const prevTeam = arr[count - 1];
    const shouldDoSwap = shouldSwap(prevTeam, currentTeam, rank, statistic);
    if (shouldDoSwap) {
      arr[count] = prevTeam;
      arr[count - 1] = currentTeam;
      count--;
    } else {
      break;
    }
  }
}

function shouldSwap(teamA, teamB, rank, statistic) {
  const [teamAName, teamACount] = teamA;
  const [teamBName, teamBCount] = teamB;
  if (teamBCount > teamACount) {
    return true;
  } else if (teamBCount < teamACount) {
    return false;
  } else {
    if (rank >= statistic.length - 1) {
      return teamBName.charCodeAt(0) < teamAName.charCodeAt(0);
    }
    const nextRankTeamACount = statistic[rank + 1][teamAName];
    const nextRankTeamBCount = statistic[rank + 1][teamBName];
    return shouldSwap(
      [teamAName, nextRankTeamACount],
      [teamBName, nextRankTeamBCount],
      rank + 1,
      statistic
    );
  }
}
