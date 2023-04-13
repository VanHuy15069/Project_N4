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
        }
    }
    orderDetails.init(
        {
            orderId: DataTypes.INTEGER,
            productId: DataTypes.INTEGER,
            quality: DataTypes.STRING(255),
        },
        {
            sequelize,
            modelName: 'orderDetails',
        },
    );
    return orderDetails;
};
