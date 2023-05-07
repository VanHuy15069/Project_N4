'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            //define association here
            Order.belongsTo(models.Product, { foreignKey: 'productId', targetKey: 'id', as: 'productInfo' });
            Order.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id', as: 'userInfo' });
            Order.hasOne(models.orderDetails, { foreignKey: 'orderId', as: 'orderInfo' });
        }
    }
    Order.init(
        {
            userId: DataTypes.INTEGER,
            productId: DataTypes.INTEGER,
            quantity: DataTypes.INTEGER,
            priceTotal: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Order',
        },
    );
    return Order;
};
