import { DataTypes } from 'sequelize';
import { v4 as uuid } from 'uuid';
import BaseModel from './BaseModel';

export default class User extends BaseModel {
  static modelName = 'user';

  static tableName = 'users';

  static protectedKeys = ['createdAt', 'updatedAt'];

  static Schema = {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    phone: {
      type: DataTypes.STRING,
      scopes: ['me'],
    },
    email: {
      type: DataTypes.STRING,
      scopes: ['me'],
    },
    online: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  }

  static Settings = {
    // define validators, indexes, hooks and etc here
    hooks: {
      async beforeCreate(user) {
        user.id = uuid();
      },
    },
  }

  // eslint-disable-next-line no-unused-vars
  static associate(models) {
    // define association here
    User.hasOne(models.profile, {
      onDelete: 'CASCADE',
    });
    User.belongsToMany(models.profile, {
      through: 'assessment', uniqueKey: 'id', as: 'assessments', foreignKey: 'assessorId',
    });
    User.belongsToMany(models.chat, {
      through: models.member, uniqueKey: 'id', foreignKey: 'userId', timestamps: false,
    });
    User.hasOne(models.device, {
      onDelete: 'CASCADE',
    });
    User.belongsToMany(models.user, {
      through: 'blackList', uniqueKey: 'id', as: 'blackLists', foreignKey: 'userId',
    });
    User.belongsToMany(models.user, {
      through: 'blackList', uniqueKey: 'id', as: 'banned', foreignKey: 'bannedId',
    });
    User.belongsToMany(models.user, {
      through: 'appeal', uniqueKey: 'id', as: 'appellant', foreignKey: 'userId',
    });
    User.belongsToMany(models.user, {
      through: 'appeal', uniqueKey: 'id', as: 'suspect', foreignKey: 'suspectId',
    });
    User.belongsTo(models.spot);
    User.hasMany(models.usersSpot, {
      onDelete: 'CASCADE',
    });
  }
}
