import { DataTypes } from 'sequelize';

export async function up(queryInterface) {
  const transaction = await queryInterface.sequelize.transaction();
  try {
    await queryInterface.removeColumn('stats',
      'passiveLevel', { transaction });
    await queryInterface.removeColumn('stats',
      'activeLevel', { transaction });
    await transaction.commit();
  } catch (err) {
    await transaction.rollback();
    throw err;
  }
}

export async function down(queryInterface) {
  const transaction = await queryInterface.sequelize.transaction();
  try {
    await queryInterface.addColumn('stats', 'passiveLevel', {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    }, { transaction });
    await queryInterface.addColumn('stats', 'activeLevel', {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    }, { transaction });
    await transaction.commit();
  } catch (err) {
    await transaction.rollback();
    throw err;
  }
}
