const { Car } = require('../models');
const { Size } = require('../models');
const path = require('path');
const fs = require('fs');

const upperWord = (input) => {
  const mySentence = input;
  const finalSentence = mySentence.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
  return finalSentence;
};

const deletePhoto = (fileName) => {
  fs.unlink(path.join(__dirname, '../upload/' + fileName), (err) => {
    if (err) {
      console.log(err);
    }
  });
};

const readAll = async (req, res) => {
  try {
    const Cars = await Car.findAll({ include: [{ model: Size, as: 'size' }] });
    res.json(Cars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const readById = async (req, res) => {
  try {
    const Cars = await Car.findOne({ where: { id: req.params.id }, include: [{ model: Size, as: 'size' }] });
    res.json(Cars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createCar = async (req, res) => {
  try {
    const { price, id_car_size } = req.body;
    const name_car = upperWord(req.body.name_car);
    const photo = req.file.filename;
    const newCar = new Car({
      name_car,
      price,
      photo,
      id_car_size,
    });
    await newCar.save();
    req.flash('message', 'added');
    res.redirect('/');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCar = async (req, res) => {
  try {
    const car = await Car.findOne({ where: { id: req.params.id } });
    const { price, id_car_size } = req.body;
    const name_car = upperWord(req.body.name_car);
    const photo = req.file !== undefined && req.file.filename !== undefined ? req.file.filename  : car.photo;
    if (photo !== car.photo) {
      deletePhoto(car.photo);
    }
    await Car.update(
      {
        name_car,
        price,
        photo,
        id_car_size,
      },
      {
        where: { id: req.params.id },
      }
    );
    req.flash('message', 'updated');
    res.redirect('/');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCar = async (req, res) => {
  try {
    const car = await Car.findOne({ where: { id: req.params.id } });
    car.destroy(req.body);
    deletePhoto(car.photo);
    req.flash('message', 'deleted');
    res.redirect('/');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createSizeCar = async (req, res) => {
  try {
    const car_size = req.body.car_size;
    const newSize = new Size({
      car_size,
    });
    await newSize.save();
    res.send("Car size added");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSizeCar = async (req, res) => {
  try {
    const Sizes = await Size.findAll({});
    res.json(Sizes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { readAll, readById, createCar, deleteCar, updateCar, createSizeCar, getSizeCar };
