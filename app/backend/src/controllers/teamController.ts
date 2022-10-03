import { Request, Response, NextFunction } from 'express';
import TeamService from '../services/teamService';

export default class TeamController {
  constructor(
    private service = new TeamService(),
  ) {}

  public getAllTeams = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const teams = await this.service.findAll();
      res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  };

  public getTeamById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const team = await this.service.findById(Number(id));
      res.status(200).json(team);
    } catch (error) {
      next(error);
    }
  };
}
