import CustomError from '../utils/customError';
import Teams from '../database/models/teamsModel';

export default class TeamsService {
  private model = Teams;

  public async findAll() {
    const teams = await this.model.findAll();
    if (!teams) {
      throw new CustomError('No teams found', 404);
    }
    return teams;
  }

  public async findById(id: number) {
    const team = await this.model.findOne({ where: { id } });
    if (!team) {
      throw new CustomError('No teams found', 404);
    }
    return team;
  }
}
