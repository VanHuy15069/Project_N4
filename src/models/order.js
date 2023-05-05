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
            Order.belongsTo(models.orderDetails, { foreignKey: 'orderDetailId', targetKey: 'id', as: 'orderDetails' });
        }
    }
    Order.init(
        {
            orderDetailId: DataTypes.INTEGER,
            fullName: DataTypes.STRING(255),
            address: DataTypes.STRING(255),
            phoneNumber: DataTypes.STRING(255),
        },
        {
            sequelize,
            modelName: 'Order',
        },
    );
    return Order;
};
