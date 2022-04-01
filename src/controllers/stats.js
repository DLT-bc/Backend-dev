// import _ from 'lodash';
import { Stats } from '../models';

async function updateStats(userId, options) {
  const {
    cryptocurrency, dollars, popularity, serverLevel, minerLevel, instructionsLevel,
  } = options;

  // const user = await User.findOneOrFail({
  //   id: userId,
  // });

  const stats = await Stats.update({
    cryptocurrency,
    dollars,
    popularity,
    serverLevel,
    minerLevel,
    instructionsLevel,
  }, {
    where: {
      userId,
    },
    returning: true,
    plain: true,
  });
  return stats[1].dataValues;
}

// Другой вариант обновления значений в таблице

// async function UpdateUser1(userId, options) {
//   const {
//     cryptocurrency, dollars, popularity, serverLevel, minerLevel, instructionsLevel, passiveLevel, activeLevel,
//   } = options;
//
//   const stats = await Stats.findOneOrFail({ userId });
//
//   const values = _.pickBy({
//     cryptocurrency,
//     dollars,
//     popularity,
//     serverLevel,
//     minerLevel,
//     instructionsLevel,
//     passiveLevel,
//     activeLevel,
//   });
//
//   stats.set(values);
//   await stats.save();
//
//   return stats.publish(['refs', 'dates']);
// }

export {
  updateStats,
};
