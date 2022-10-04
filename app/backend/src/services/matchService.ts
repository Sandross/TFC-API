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

  public async findById(id: number) {
    const match = await this.model.findOne({ where: { id } });
    if (!match) {
      throw new CustomError('No matches found', 404);
    }
    return match;
  }
}
