'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Product.init(
        {
            categoryId: DataTypes.INTEGER,
            title: DataTypes.STRING(255),
            avatar: DataTypes.STRING(255),
            price: DataTypes.INTEGER,
            weight: DataTypes.STRING(255),
            supplier: DataTypes.STRING(255),
            summary: DataTypes.STRING(255),
            connect: DataTypes.STRING(255),
        },
        {
            sequelize,
            modelName: 'Product',
        },
    );
    return Product;
};
