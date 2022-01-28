import { User } from '../models';

async function registerUser({ email, login, password }) {
  // your code
  console.log('', email, login, password);
  const user = await User.create({
    email,
    login,
    password,
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
