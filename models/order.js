'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Order.belongsTo(models.Product, {
        foreignKey: 'product_id',
        as: 'product',
      })
      models.Order.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
      })
    }
  }
  Order.init(
    {
      product_id: DataTypes.INTEGER,
      amount: DataTypes.INTEGER,
      total: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Order',
    },
  )
  return Order
}
