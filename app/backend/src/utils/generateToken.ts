import * as Jwt from 'jsonwebtoken';

const JWT_SECRET = 'jwt_secret';
const JWT_CONFIG:object = {
  algorithm: 'HS256',
  expiresIn: '7d',
};
const generateToken = (payload: object): string => {
  const token = Jwt.sign(payload, JWT_SECRET, JWT_CONFIG);
  return token;
};

export default generateToken;
