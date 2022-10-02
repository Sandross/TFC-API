import { Router } from 'express';
import LoginController from '../controllers/loginController';

const loginRouter = Router();

const loginController = new LoginController();

loginRouter.post('/login', loginController.login);
loginRouter.get('/login/validate', loginController.getRole);

export default loginRouter;
