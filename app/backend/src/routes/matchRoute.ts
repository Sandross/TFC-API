import { Router } from 'express';
import tokenValidate from '../middlewares/tokenValidate';
import MatchController from '../controllers/matchController';

const matchRouter = Router();

const matchController = new MatchController();

matchRouter.get('/matches', matchController.getAllMatches);
matchRouter.post('/matches', tokenValidate, matchController.createMatch);
matchRouter.patch('/matches/:id', matchController.updateMatch);
matchRouter.patch('/matches/:id/finish', matchController.finishMatch);

export default matchRouter;
