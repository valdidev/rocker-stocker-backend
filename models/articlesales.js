'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ArticleSales extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ArticleSales.init({
    id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ArticleSales',
  });
  return ArticleSales;
};