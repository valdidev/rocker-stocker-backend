'use strict';

const { getCurrentDate } = require('../utils/utils');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    let currentDate = getCurrentDate()

    await queryInterface.bulkInsert('rols', [{
      id: 1, membership: "admin", createdAt: currentDate, updatedAt: currentDate,
    },
    { id: 2, membership: "user", createdAt: currentDate, updatedAt: currentDate, }
    ], {});

  },

  async down(queryInterface, Sequelize) {
   await queryInterface.bulkDelete('rols', null, {});
    
  }
};
