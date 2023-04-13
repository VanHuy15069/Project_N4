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
            // define association here
        }
    }
    Order.init(
        {
            userId: DataTypes.INTEGER,
            fullName: DataTypes.STRING(255),
            address: DataTypes.STRING(255),
            phoneNumber: DataTypes.STRING(255),
            email: DataTypes.STRING(255),
            note: DataTypes.STRING(255),
            priceTotal: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Order',
        },
    );
    return Order;
};
