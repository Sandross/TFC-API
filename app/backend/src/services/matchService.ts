import CustomError from '../utils/customError';
import Matches from '../database/models/matchesModel';
import Team from '../database/models/teamsModel';

export default class MatchService {
  private _model = Matches;
  private _team = Team;
  public async findAll() {
    const matches = await this._model.findAll({
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

  public async createMatches(match: Matches) {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = match;
    if (homeTeam === awayTeam) {
      throw new CustomError('It is not possible to create a match with two equal teams', 401);
    }
    const homeTeamI = await this._team.findOne({ where: { id: homeTeam } });
    const awayTeamI = await this._team.findOne({ where: { id: awayTeam } });
    if (!homeTeamI || !awayTeamI) {
      throw new CustomError('There is no team with such id!', 404);
    }
    const newMatch = await this._model.create({
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });
    if (!newMatch) throw new CustomError('Something went wrong', 500);
    return newMatch;
  }

  public finishMatch = async (id:number) => {
    await Matches.update({ inProgress: false }, { where: { id } });
  };

  public updateMatch = async (id:number, homeTeamGoals:number, awayTeamGoals:number) => {
    await Matches.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  };
}
