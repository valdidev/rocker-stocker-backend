'use strict';

require('dotenv').config();
const { encryptPassword } = require('../services/auth.services');
const { getCurrentDate } = require('../utils/utils');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    let currentDate = getCurrentDate()

    let hashedPassword = encryptPassword(process.env.FAKE_USER_PASSWORD)

    await queryInterface.bulkInsert('users', [
      {
        id: 1,
        name: "Fernando",
        surname: "Valdi",
        email: "fvaldi@rockerstocker.com",
        rolId: 1,
        phone: "655112131",
        password: hashedPassword,
        createdAt: currentDate,
        updatedAt: currentDate
      },
      {
        id: 2,
        name: "Alejandro",
        surname: "Valdi",
        email: "avaldi@rockerstocker.com",
        rolId: 1,
        phone: "655122232",
        password: hashedPassword,
        createdAt: currentDate,
        updatedAt: currentDate
      },
      {
        id: 4,
        name: "Gaspar",
        surname: "Lopez",
        email: "glopez@rockerstocker.com",
        rolId: 2,
        phone: "655132333",
        password: hashedPassword,
        createdAt: currentDate,
        updatedAt: currentDate
      },
      {
        id: 5,
        name: "Sonia",
        surname: "Molina",
        email: "smolina@rockerstocker.com",
        rolId: 2,
        phone: "655142434",
        password: hashedPassword,
        createdAt: currentDate,
        updatedAt: currentDate
      },
    ], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('users', null, {});

  }
};
