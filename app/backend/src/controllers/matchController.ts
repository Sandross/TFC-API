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
}
