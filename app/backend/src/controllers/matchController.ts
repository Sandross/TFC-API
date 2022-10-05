import { Request, Response, NextFunction } from 'express';
import MatchService from '../services/matchService';

export default class MatchController {
  constructor(
    private service = new MatchService(),
  ) {}

  public getAllMatches = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const matches = await this.service.findAll();
      res.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  };

  public createMatch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const match = req.body;
      const createdMatch = await this.service.createMatches(match);
      res.status(201).json(createdMatch);
    } catch (error) {
      next(error);
    }
  };

  public finishMatch = async (req:Request, res:Response) => {
    const { id } = req.params;
    await this.service.finishMatch(Number(id));
    return res.status(200).json({ message: 'Finished' });
  };

  public updateMatch = async (req:Request, res:Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await this.service.updateMatch(Number(id), homeTeamGoals, awayTeamGoals);
    return res.status(200).json({ message: 'Done' });
  };
}
