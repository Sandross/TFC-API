import { Router } from 'express';
import LeaderBoardController from '../controllers/leaderboardController';

const leaderBoardRouter = Router();

const leaderBoardController = new LeaderBoardController();

leaderBoardRouter.get('/leaderboard/home', leaderBoardController.getAll);

export default leaderBoardRouter;
