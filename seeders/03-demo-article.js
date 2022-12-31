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
        name: "aluminum paint roller",
        brand: "dexter",
        category: "tools",
        price: 7,
        units: 50,
        inStock: 1,
        ean: 1234567891237,
        isVisible: 1,
        userId: 2,
        createdAt: currentDate,
        updatedAt: currentDate
      },
      {
        id: 5,
        name: "flat brush",
        brand: "dexter",
        category: "tools",
        price: 2,
        units: 50,
        inStock: 1,
        ean: 1234567891238,
        isVisible: 1,
        userId: 1,
        createdAt: currentDate,
        updatedAt: currentDate
      },
      {
        id: 6,
        name: "insulated screwdriver",
        brand: "top",
        category: "tools",
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
        id: 7,
        name: "1m professional wire",
        brand: "top",
        category: "electricity",
        price: 2.50,
        units: 50,
        inStock: 1,
        ean: 1234567891210,
        isVisible: 1,
        userId: 1,
        createdAt: currentDate,
        updatedAt: currentDate
      },
      {
        id: 8,
        name: "thermal insulating panel",
        brand: "copopren",
        category: "insulators",
        price: 8,
        units: 50,
        inStock: 1,
        ean: 1234567891211,
        isVisible: 1,
        userId: 2,
        createdAt: currentDate,
        updatedAt: currentDate
      },
      {
        id: 9,
        name: "acoustic insulating roll",
        brand: "copopren",
        category: "insulators",
        price: 15,
        units: 50,
        inStock: 1,
        ean: 1234567891212,
        isVisible: 1,
        userId: 2,
        createdAt: currentDate,
        updatedAt: currentDate
      },
      {
        id: 10,
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
        id: 11,
        name: "clay roof tiles",
        brand: "terracotasa",
        category: "construction",
        price: 1.8,
        units: 50,
        inStock: 1,
        ean: 1234567891214,
        isVisible: 1,
        userId: 1,
        createdAt: currentDate,
        updatedAt: currentDate
      },
    ], {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('articles', null, {});

  }
};
