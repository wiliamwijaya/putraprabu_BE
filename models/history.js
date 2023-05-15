'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.History.belongsTo(models.Order, {
        foreignKey: 'order_id',
        as: 'order',
      })
    }
  }
  History.init(
    {
      order_id: DataTypes.INTEGER,
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'History',
    },
  )
  return History
}
