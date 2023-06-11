'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here   
      models.Car.belongsTo(models.Size, {
        foreignKey: "id_car_size",
        as: "size",
      });
    }
  }
  Car.init({
    name_car: DataTypes.STRING,
    price: DataTypes.STRING,
    photo: DataTypes.STRING,
    id_car_size: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Car',
  });
  return Car;
};