'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Characters', Characters, [{
    }], {});

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
