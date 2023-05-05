'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class orderDetails extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            orderDetails.hasOne(models.Order, { foreignKey: 'orderDetailId', as: 'orderDetails' });
            orderDetails.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id', as: 'users' });
            orderDetails.belongsTo(models.Product, { foreignKey: 'productId', targetKey: 'id', as: 'products' });
        }
    }
    orderDetails.init(
        {
            userId: DataTypes.INTEGER,
            productId: DataTypes.INTEGER,
            note: DataTypes.STRING(255),
            quantity: DataTypes.INTEGER,
            priceTotal: DataTypes.INTEGER,
            status: DataTypes.STRING(255),
        },
        {
            sequelize,
            modelName: 'orderDetails',
        },
    );
    return orderDetails;
};
