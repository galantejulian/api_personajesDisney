
'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    let users = [
      { name: "Jota", email: "prueba1@gmail.com", password: "12345" },
    ]
    return queryInterface.bulkInsert('users', users, {})
  },

  async down(queryInterface, Sequelize) {

    return queryInterface.bulkDelete('users', null, {})
  }
};
