import CustomError from '../utils/customError';
import generateToken from '../utils/generateToken';
import UserModel from '../database/models/userModel';
import decryptPassword from '../utils/decryptPassword';

export default class LoginService {
  constructor(private _User = UserModel) {}
  public async login(email: string, _password:string) {
    const user = await this._User.findOne({ where: { email } });
    if (!user) {
      throw new CustomError('Incorrect email or password', 404);
    }
    await decryptPassword(_password, user.password);
    const token = generateToken(user.get());
    return { token };
  }
}
