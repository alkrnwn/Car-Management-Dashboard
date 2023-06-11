const { Car } = require('../models');
const { Size } = require('../models');
const moment = require('moment/moment');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const axios = require('axios').default;

const dashboardView = async (req, res) => {
  try {
    const url = req.protocol + '://' + req.get('host');
    axios
      .get(url + '/api/v1/getall')
      .then((response) => {
        const messages = req.flash('message');
        res.render('dashboard', { cars: response.data, title: 'Dashboard', message: messages, time: moment });
      })
      .catch((error) => {
        console.log('error===', error);
      });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
};

const addView = async (req, res) => {
  try {
    const url = req.protocol + '://' + req.get('host');
    axios
      .get(url + '/api/v1/getSize')
      .then((response) => {
        res.render('add-car', { title: 'Add New Car', sizes: response.data });
      })
      .catch((error) => {
        console.log('error===', error);
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const editView = async (req, res) => {
  try {
    const url = req.protocol + '://' + req.get('host');
    axios
      .get(url + '/api/v1/getby/' + req.params.id)
      .then((response) => {
        const car_data = response.data;
        axios
          .get(url + '/api/v1/getSize')
          .then((response) => {
            res.render('edit-car', { car: car_data, title: 'Edit', sizes: response.data });
          })
          .catch((error) => {
            console.log('error===', error);
          });
      })
      .catch((error) => {
        console.log('error===', error);
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const filter = async (req, res) => {
  const Cars = await Car.findAll({ where: { '$size.car_size$': req.query.size }, include: [{ model: Size, as: 'size' }] });
  res.render('dashboard', { cars: Cars, title: 'Dashboard', message: null, time: moment });
};

const search = async (req, res) => {
  const Cars = await Car.findAll({ where: { name_car: { [Op.like]: `%${req.query.name}%` } }, include: [{ model: Size, as: 'size' }] });
  res.render('dashboard', { cars: Cars, title: 'Dashboard', message: null, time: moment });
};

module.exports = { dashboardView, addView, editView, filter, search };
