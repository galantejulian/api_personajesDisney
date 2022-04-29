'use strict';

const faker = require("faker");

faker
module.exports = {
  async up(queryInterface, Sequelize) {
    let characters = [{
      name: 'Jepeto', image: faker.image.abstract(), age: 50, weight: 80, history: "lorem ipsum",
    },
    {
      name: 'Terk', image: faker.image.abstract(), age: 12, weight: 40, history: "llorem ipsum"
    },
    {
      name: 'Minnie', image: faker.image.abstract(), age: 10, weight: 40, history: "llorem ipsum"
    },
    {
      name: 'Mickey', image: faker.image.abstract(), age: 10, weight: 50, history: "llorem ipsum"
    },
    {
      name: 'Donald', image: faker.image.abstract(), age: 11, weight: 60, history: "llorem ipsum"
    }];
    return queryInterface.bulkInsert('Characters', characters, {})
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