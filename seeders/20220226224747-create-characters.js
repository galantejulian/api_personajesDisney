'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    let Characters = [
      {
        name: "Mickey",
        age: 15,
        history: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris n",
        image: "https://disney.fandom.com/es/wiki/Mickey_Mouse?file=MickeyMouse.png",
        weight: 40,
      },
      {
        name: "Donald",
        age: 16,
        history: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris n",
        image: "https://static.wikia.nocookie.net/disney/images/6/6f/Donald_Duck.png/revision/latest?cb=20140427112158&path-prefix=es",
        weight: 40,
        Movies: [{
          title: 'Donald y los fantasmas',
          image_movie: "https://static.wikia.nocookie.net/disney/images/6/6f/Donald_Duck.png/revision/latest?cb=20140427112158&path-prefix=es",
          relase_date: 2003 - 12 - 31,
          rating: 7
        }, {
          include: ['Movies']
        }]

      }
    ]
    return queryInterface.bulkInsert('Characters', Characters, {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Characters', null, {});

  }
};
