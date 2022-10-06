import Match from '../database/models/matchesModel';
import Team from '../database/models/teamsModel';
import { ILeaderboard, ILeaderboardBoard } from '../interfaces/Leaderboard';
import { IMatches } from '../interfaces/Team';

export default class LeaderService {
  constructor(private model = Team) { this.model = model; }

  public countGoals = (matches: IMatches[]): number[] => {
    const goalsFavor = matches
      .reduce((currMatch, nextMatch: IMatches) =>
        currMatch + nextMatch.homeTeamGoals, 0);
    const goalsAgainst = matches
      .reduce((currMatch, nextMatch: IMatches) =>
        currMatch + nextMatch.awayTeamGoals, 0);
    const goalsBalance = goalsFavor - goalsAgainst;
    return [goalsFavor, goalsAgainst, goalsBalance];
  };

  public calcEfficiency = (totalPoints: number, totalMatches: number): number => {
    const result = (totalPoints / (totalMatches * 3)) * 100;
    return result;
  };

  public countTotalResult = (matches: IMatches[]):number[] => {
    let victories = 0;
    let draws = 0;
    let losses = 0;
    let totalPoints = 0;
    matches.forEach((matchs: IMatches) => {
      if (matchs.homeTeamGoals > matchs.awayTeamGoals) { victories += 1; totalPoints += 3; }
      if (matchs.homeTeamGoals === matchs.awayTeamGoals) { draws += 1; totalPoints += 1; }
      if (matchs.homeTeamGoals < matchs.awayTeamGoals) { losses += 1; }
    });
    return [victories, draws, losses, totalPoints];
  };

  public getLeaderboard = ({ teamName, matchesHome }: ILeaderboard) => {
    const [
      victoriesHome, drawsHome, lossesHome, pointsHome,
    ] = this.countTotalResult(matchesHome);
    const [goalsFavorHome, goalsOwnHome, goalsBalanceHome] = this.countGoals(matchesHome);
    const efficiency = this.calcEfficiency(pointsHome, matchesHome.length);

    return {
      name: teamName,
      totalPoints: pointsHome,
      totalGames: matchesHome.length,
      totalVictories: victoriesHome,
      totalDraws: drawsHome,
      totalLosses: lossesHome,
      goalsFavor: goalsFavorHome,
      goalsOwn: goalsOwnHome,
      goalsBalance: goalsBalanceHome,
      efficiency: Number(efficiency.toFixed(2)),
    };
  };

  public orderLeaderboard = (a: ILeaderboardBoard, b:ILeaderboardBoard) => {
    if (a.totalPoints < b.totalPoints) { return 1; }
    if (a.totalPoints > b.totalPoints) { return -1; }
    if (a.totalVictories < b.totalVictories) { return 1; }
    if (a.totalVictories > b.totalVictories) { return -1; }
    if (a.goalsBalance < b.goalsBalance) { return 1; }
    if (a.goalsBalance > b.goalsBalance) { return -1; }
    if (a.goalsFavor < b.goalsFavor) { return 1; }
    if (a.goalsFavor > b.goalsFavor) { return -1; }
    if (a.goalsOwn < b.goalsOwn) { return 1; }
    if (a.goalsOwn > b.goalsOwn) { return -1; }
    return 0;
  };

  // Feito com ajuda do colega de tribo Emanuel Calado- 19C

  public async getAll() {
    const dataMatch = await this.model.findAll({
      include: [
        { model: Match, as: 'matchesHome', where: { inProgress: 0 } },
      ] }) as unknown as ILeaderboard[];
    const leaderboard = dataMatch as unknown as ILeaderboard[];
    const allTeams = leaderboard.map(this.getLeaderboard);
    return allTeams.sort(this.orderLeaderboard);
  }
}
