import { Sequelize } from 'sequelize';
import { dbConfig } from '../config/sequelize';

import User from './User';

const {
  database, username, password, ...configs
} = dbConfig;
const sequelize = new Sequelize(database, username, password, configs);

// initialize models
User.initialize(sequelize);

// associate models
User.associate(sequelize.models);

export {
  sequelize,
  Sequelize,
  User,
};
