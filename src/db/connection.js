const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: process.env.DIALECT,
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Authentication successful');
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = {Sequelize, sequelize};
