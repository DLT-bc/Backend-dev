import { BadRequest } from 'http-errors';
import { User } from '../models';
import { ErrorMessages } from '../constants';
import { hashPassword } from '../utils';

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

async function loginUser() {
  // your code
  return '';
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
