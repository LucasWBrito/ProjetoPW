const {Sequelize, sequelize} = require('../db/connection');

const User = sequelize.define('user', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      len: [2, 20],
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      is: ['[a-z0-9]', 'i'],
    },
  },
});

module.exports = User;
