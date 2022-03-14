import { Stats, User } from '../models';

async function UpdateUser(userId, options) {
  const {
    cryptocurrency, dollars, popularity, serverLevel, minerLevel, instructionsLevel, passiveLevel, activeLevel,
  } = options;

  const user = await User.findOneOrFail({
    id: userId,
  });

  const stats = await Stats.update({
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
      userId: user.id,
    },
    returning: true,
    plain: true,
  });
  return stats[1].dataValues;
}

export {
  UpdateUser,
};
