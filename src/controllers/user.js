import { Stats } from '../models';

async function getUsers() {
  const users = await Stats.findAll();
  return users.map((user) => user.publish('dates'));
}

export {
  getUsers,
};
