import { BadRequest } from 'http-errors';
import { User } from '../models';
import { ErrorMessages } from '../constants';
import {
  comparePasswords, generateAccessToken, generateRefreshToken, hashPassword,
} from '../utils';

async function registerUser({ email, login, password }) {
  const existing = await User.findOne({
    where: {
      email,
    },
  });
  if (existing) throw new BadRequest(ErrorMessages.record_already_exists);

  const user = await User.create({
    email,
    login,
    password: hashPassword(password),
  });

  return user.publish('dates');
}

async function loginUser({ email, password }) {
  const existingUser = await User.findOneOrFail({ email });

  if (!await comparePasswords(password, existingUser.password)) {
    throw new BadRequest(ErrorMessages.auth_invalid_login_password);
  }

  return [generateAccessToken(existingUser.id), generateRefreshToken(existingUser.id)];
}

async function refreshTokens() {
  //
  return '';
}

export {
  registerUser,
  refreshTokens,
  loginUser,
};
