import { Stats } from '../models';

async function getUsers() {
  const users = await Stats.findAll();
  return users.map((user) => user.publish('dates'));
}

async function UpdateUser({
  userId, cryptocurrency, dollars, popularity, serverLevel, minerLevel, instructionsLevel, passiveLevel, activeLevel,
}) {
  const updatedUser = await Stats.update({
    cryptocurrency,
    dollars,
    popularity,
    serverLevel,
    minerLevel,
    instructionsLevel,
    passiveLevel,
    activeLevel,
  }, {
    where: {
      userId: `${userId}`,
    },
    returning: true,
    plain: true,
  });
  return updatedUser[1].dataValues;
}

export {
  UpdateUser,
  getUsers,
};
