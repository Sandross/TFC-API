import * as bcrypt from 'bcryptjs';
import CustomError from './customError';

const decryptPassword = async (password: string, hash: string): Promise<void> => {
  const result = await bcrypt.compare(password, hash);
  if (!result) {
    throw new CustomError('Incorrect email or password', 401);
  }
};

export default decryptPassword;
