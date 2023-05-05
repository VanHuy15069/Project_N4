'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class New extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            New.belongsTo(models.Categories, { foreignKey: 'categoryId', targetKey: 'id', as: 'categoriesId' });
        }
    }
    New.init(
        {
            categoryId: DataTypes.INTEGER,
            title: DataTypes.STRING(255),
            avatar: DataTypes.STRING(255),
            content: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: 'New',
        },
    );
    return New;
};
