'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Blog extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Blog.init(
        {
            title: DataTypes.STRING(255),
            image: DataTypes.STRING(255),
            contentHTML: DataTypes.TEXT('long'),
            contentHTMLMarkdown: DataTypes.TEXT('long'),
        },
        {
            sequelize,
            modelName: 'Blog',
        },
    );
    return Blog;
};
