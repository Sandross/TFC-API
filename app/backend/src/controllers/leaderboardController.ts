import { Request, Response } from 'express';
import LeaderBoardService from '../services/leaderboardService';

export default class LeaderController {
  private service: LeaderBoardService;

  constructor(service = new LeaderBoardService()) {
    this.service = service;
  }

  public getAll = async (req: Request, res: Response) => {
    const data = await this.service.getAll();
    return res.status(200).json(data);
  };
}
