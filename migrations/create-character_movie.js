'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Characters_movies', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            character_id: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            movie_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Characters_movie');
    }
};