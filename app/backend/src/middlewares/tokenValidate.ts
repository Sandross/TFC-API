import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import CustomError from '../utils/customError';

const JWT_SECRET = 'jwt_secret';
const tokenValidation = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    return next(new CustomError('Token not found', 401));
  }
  try {
    jwt.verify(token as string, JWT_SECRET);
    return next();
  } catch (error) {
    return next(new CustomError('Token must be a valid token', 401));
  }
};

// Feito com auxilio de colega de turma

export default tokenValidation;
