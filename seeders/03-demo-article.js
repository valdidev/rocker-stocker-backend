'use strict';

const { getCurrentDate } = require('../utils/utils');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    let currentDate = getCurrentDate()

    await queryInterface.bulkInsert('articles', [
      {
        id: 1,
        name: "classic cement",
        brand: "lafarge",
        category: "construction",
        price: 3.80,
        units: 50,
        inStock: 1,
        ean: 1234567891234,
        isVisible: 1,
        userId: 1,
        createdAt: currentDate,
        updatedAt: currentDate
      },
      {
        id: 2,
        name: "grey cement",
        brand: "axton",
        category: "construction",
        price: 3,
        units: 50,
        inStock: 1,
        ean: 1234567891235,
        isVisible: 1,
        userId: 1,
        createdAt: currentDate,
        updatedAt: currentDate
      },
      {
        id: 3,
        name: "fast cement",
        brand: "axton",
        category: "construction",
        price: 9,
        units: 50,
        inStock: 1,
        ean: 1234567891236,
        isVisible: 1,
        userId: 2,
        createdAt: currentDate,
        updatedAt: currentDate
      },
      {
        id: 4,
        name: "slow cement",
        brand: "axton",
        category: "construction",
        price: 8,
        units: 50,
        inStock: 1,
        ean: 1234667891236,
        isVisible: 1,
        userId: 2,
        createdAt: currentDate,
        updatedAt: currentDate
      },
      {
        id: 5,
        name: "portand",
        brand: "technohouse",
        category: "construction",
        price: 6,
        units: 50,
        inStock: 1,
        ean: 1234667791236,
        isVisible: 1,
        userId: 2,
        createdAt: currentDate,
        updatedAt: currentDate
      },
      {
        id: 6,
        name: "cover plastic 2m",
        brand: "copopren",
        category: "painting",
        price: 2,
        units: 50,
        inStock: 1,
        ean: 1234567891213,
        isVisible: 1,
        userId: 1,
        createdAt: currentDate,
        updatedAt: currentDate
      },
      {
        id: 7,
        name: "aluminum paint roller",
        brand: "dexter",
        category: "painting",
        price: 7,
        units: 50,
        inStock: 1,
        ean: 1232356781237,
        isVisible: 1,
        userId: 2,
        createdAt: currentDate,
        updatedAt: currentDate
      },
      {
        id: 8,
        name: "4l black solid",
        brand: "dexter",
        category: "painting",
        price: 17,
        units: 50,
        inStock: 1,
        ean: 1238567891238,
        isVisible: 1,
        userId: 1,
        createdAt: currentDate,
        updatedAt: currentDate
      },
      {
        id: 9,
        name: "fat roller",
        brand: "top",
        category: "painting",
        price: 4,
        units: 50,
        inStock: 1,
        ean: 1234567891239,
        isVisible: 1,
        userId: 1,
        createdAt: currentDate,
        updatedAt: currentDate
      },
      {
        id: 10,
        name: "4l yellow",
        brand: "dexter",
        category: "painting",
        price: 14,
        units: 50,
        inStock: 1,
        ean: 1234567871213,
        isVisible: 1,
        userId: 1,
        createdAt: currentDate,
        updatedAt: currentDate
      },
      {
        id: 11,
        name: "insulated screwdriver",
        brand: "top",
        category: "electricity",
        price: 4,
        units: 50,
        inStock: 1,
        ean: 1234567891239,
        isVisible: 1,
        userId: 1,
        createdAt: currentDate,
        updatedAt: currentDate
      },
      {
        id: 12,
        name: "2m red wire",
        brand: "electrosys",
        category: "electricity",
        price: 5,
        units: 50,
        inStock: 1,
        ean: 1234567892214,
        isVisible: 1,
        userId: 1,
        createdAt: currentDate,
        updatedAt: currentDate
      },
      {
        id: 13,
        name: "1m professional wire",
        brand: "top",
        category: "electricity",
        price: 2.50,
        units: 50,
        inStock: 1,
        ean: 1232567891210,
        isVisible: 1,
        userId: 1,
        createdAt: currentDate,
        updatedAt: currentDate
      },
      {
        id: 14,
        name: "insulating panel",
        brand: "copopren",
        category: "electricity",
        price: 20,
        units: 50,
        inStock: 1,
        ean: 1234567891211,
        isVisible: 1,
        userId: 2,
        createdAt: currentDate,
        updatedAt: currentDate
      },
      {
        id: 15,
        name: "insulating gloves",
        brand: "copopren",
        category: "electricity",
        price: 7,
        units: 50,
        inStock: 1,
        ean: 1234567691212,
        isVisible: 1,
        userId: 2,
        createdAt: currentDate,
        updatedAt: currentDate
      },
    ], {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('articles', null, {});

  }
};
