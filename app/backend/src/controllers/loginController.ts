import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import LoginService from '../services/loginService';
import { Login } from '../interfaces/Login';

config();

const secret = process.env.JWT_SECRET || 'jwt_secret';
export default class LoginController {
  constructor(
    private service = new LoginService(),
  ) {}

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.body as Login;
      const loginData = await this.service.login(user.email, user.password);
      return res.status(200).json(loginData);
    } catch (error) {
      next(error);
    }
  };

  public getRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { authorization } = req.headers;
      const user = jwt.verify(authorization as string, secret) as jwt.JwtPayload;
      return res.status(200).json({ role: user.role });
    } catch (error) {
      next(error);
    }
  };
}
