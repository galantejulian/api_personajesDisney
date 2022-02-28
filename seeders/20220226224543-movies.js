'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Movies', [{
      title: 'Mickey y los fantasmas',
      image_movie: "https://disney.fandom.com/es/wiki/Mickey_Mouse?file=MickeyMouse.png",
      relase_date: 2003 - 12 - 31,
      rating: 8,
    }, {
      where: {
        name: "Mickey"
      }
    }

    ], {});

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
