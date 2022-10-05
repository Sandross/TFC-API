import CustomError from '../utils/customError';
import Matches from '../database/models/matchesModel';
import Team from '../database/models/teamsModel';

export default class MatchService {
  private model = Matches;

  public async findAll() {
    const matches = await this.model.findAll({
      include: [{
        model: Team,
        as: 'teamHome',
        attributes: { exclude: ['id'] },
      }, {
        model: Team,
        as: 'teamAway',
        attributes: { exclude: ['id'] } }],
    });
    if (!matches) {
      throw new CustomError('No matches found', 404);
    }
    return matches;
  }

  public async createMatch(match: any) {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = match;
    if (homeTeam === awayTeam) {
      throw new CustomError('It is not possible to create a match with two equal teams', 401);
    }
    const homeTeamI = await Team.findOne({ where: { id: homeTeam } });
    const awayTeamI = await Team.findOne({ where: { id: awayTeam } });
    if (!homeTeamI || !awayTeamI) {
      throw new CustomError('There is no team with such id!', 404);
    }
    const newMatch = await this.model.create({
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });
    if (!newMatch) throw new CustomError('Something went wrong', 500);
    return newMatch;
  }
}
