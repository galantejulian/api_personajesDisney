const faker = require('faker');
'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    let users = [];
    for (let i = 0; i < 5; i++) {
      users.push({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: 1234,
      })
    }

    return queryInterface.bulkInsert('users', users, {})
  },

  async down(queryInterface, Sequelize) {

    return queryInterface.bulkDelete('users', null, {})
  }
};
