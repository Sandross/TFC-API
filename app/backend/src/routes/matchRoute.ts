import { Router } from 'express';
import tokenValidation from '../middlewares/tokenValidate';
import MatchController from '../controllers/matchController';

const matchRouter = Router();

const matchController = new MatchController();

matchRouter.get('/matches', matchController.getAllMatches);
matchRouter.post('/matches', tokenValidation, matchController.createMatch);

export default matchRouter;
