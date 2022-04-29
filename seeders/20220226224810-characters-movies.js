'use strict';
const faker = require('faker');

module.exports = {
  async up(queryInterface, Sequelize) {

    let Characters_movies = [{
      movie_id: 1, character_id: 1,
    },
    {
      movie_id: 2, character_id: 2,
    },
    {
      movie_id: 3, character_id: 3,
    }, {
      movie_id: 4, character_id: 3,
    },
    {
      movie_id: 5, character_id: 3,
    },
    {
      movie_id: 5, character_id: 4,
    },
    {
      movie_id: 5, character_id: 5,
    },
    {
      movie_id: 4, character_id: 5,
    },
    {
      movie_id: 6, character_id: 5,
    }
    ]
    return queryInterface.bulkInsert('Characters_movies', Characters_movies, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Characters_movies', null, {});
  }
};