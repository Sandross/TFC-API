import { Router } from 'express';
import TeamController from '../controllers/teamController';

const teamRouter = Router();

const teamController = new TeamController();

teamRouter.get('/teams', teamController.getAllTeams);
teamRouter.get('/teams/:id', teamController.getTeamById);

export default teamRouter;
