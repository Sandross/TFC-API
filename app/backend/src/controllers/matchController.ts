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
      const match = await this.service.createMatch(req.body);
      res.status(201).json(match);
    } catch (error) {
      next(error);
    }
  };
}
