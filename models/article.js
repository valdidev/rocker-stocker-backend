'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Article.belongsToMany(models.sale, {through: 'ArticleSales'})
      Article.belongsTo(models.user)
    }
  }
  Article.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    units: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    InStock: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
    ean: {
      type: DataTypes.STRING,
      defaultValue: true,
      allowNull: false,
      validate: {
        len: [13]
      }
    },
    IsVisible: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'article',
  });
  return Article;
};