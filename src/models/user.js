'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            User.hasOne(models.orderDetails, { foreignKey: 'userId', as: 'userOd' });
            User.hasOne(models.Order, { foreignKey: 'userId', as: 'userInfo' });
        }
    }
    User.init(
        {
            username: DataTypes.STRING(255),
            password: DataTypes.STRING(255),
            firstName: DataTypes.STRING(255),
            lastName: DataTypes.STRING(255),
            phoneNumber: DataTypes.STRING(255),
            address: DataTypes.STRING(255),
            email: DataTypes.STRING(255),
            admin: DataTypes.BOOLEAN(false),
        },
        {
            sequelize,
            modelName: 'User',
        },
    );
    return User;
};
