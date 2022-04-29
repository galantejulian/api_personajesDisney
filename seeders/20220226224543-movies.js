'use strict';
const faker = require('faker');
module.exports = {
  async up(queryInterface, Sequelize) {
    let movies = [{
      title: 'Pinocho', image_movie: faker.image.abstract(), release_date: faker.date.between('1990-01-01', '2020-01-01'), rating: '9',
    },
    {
      title: 'Tarzan', image_movie: faker.image.abstract(), release_date: faker.date.between('1990-01-01', '2020-01-01'), rating: '8',
    },
    {
      title: 'Minnie and You', image_movie: faker.image.abstract(), release_date: faker.date.between('1990-01-01', '2020-01-01'), rating: '5',
    },
    {
      title: 'House of Mouse', image_movie: faker.image.abstract(), release_date: faker.date.between('1990-01-01', '2020-01-01'), rating: '8',
    },
    {
      title: 'Minnies bow-toons', image_movie: faker.image.abstract(), release_date: faker.date.between('1990-01-01', '2020-01-01'), rating: '5',
    },
    {
      title: 'Donalds birthday', image_movie: faker.image.abstract(), release_date: faker.date.between('1990-01-01', '2020-01-01'), rating: '6',
    }];

    return queryInterface.bulkInsert('Movies', movies, {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
