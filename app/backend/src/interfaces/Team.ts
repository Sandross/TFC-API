interface IMatches {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

interface IMatchTeams extends IMatches {
  inProgress: boolean;
}

export {
  IMatches,
  IMatchTeams,
};
