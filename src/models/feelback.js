'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class FeelBack extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    FeelBack.init(
        {
            fullName: DataTypes.STRING(255),
            email: DataTypes.STRING(255),
            phoneNumber: DataTypes.STRING(255),
            address: DataTypes.STRING(255),
            note: DataTypes.STRING(255),
        },
        {
            sequelize,
            modelName: 'FeelBack',
        },
    );
    return FeelBack;
};
