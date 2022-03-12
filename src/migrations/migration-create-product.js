'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Products', {

            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            idItem: {
                type: Sequelize.STRING
            },
            addressItem: {
                type: Sequelize.STRING
            },
            nameItem: {
                type: Sequelize.STRING
            },
            keyId: {
                type: Sequelize.STRING
            },
            buyer: {
                type: Sequelize.STRING
            },
            state: {
                type: Sequelize.STRING
            },
            price: {
                type: Sequelize.STRING
            },
            image: {
                type: Sequelize.BLOB("long")
            },
            cart: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Products');
    }
};