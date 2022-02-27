'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Movies', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            image_movie: {
                type: Sequelize.STRING
            },
            title: {
                type: Sequelize.STRING
            },
            release_date: {
                type: Sequelize.DATE
            },
            rating: {
                type: Sequelize.INTEGER
            },
            genre_id: {
                type: Sequelize.INTEGER
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Movies');
    }
};