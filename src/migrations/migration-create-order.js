'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Order', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },

            // userId: DataTypes.INTEGER,
            // fullName: DataTypes.STRING(255),
            // address: DataTypes.STRING(255),
            // phoneNumber: DataTypes.STRING(255),
            // email: DataTypes.STRING(255),
            // note: DataTypes.STRING(255),
            // priceTotal: DataTypes.INTEGER,

            userId: {
                type: Sequelize.INTEGER,
            },
            fullName: {
                type: Sequelize.STRING,
            },
            address: {
                type: Sequelize.STRING,
            },
            phoneNumber: {
                type: Sequelize.STRING,
            },
            email: {
                type: Sequelize.STRING,
            },
            note: {
                type: Sequelize.STRING,
            },
            priceTotal: {
                type: Sequelize.INTEGER,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Order');
    },
};
