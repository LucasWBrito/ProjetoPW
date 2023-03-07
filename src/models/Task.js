const {Sequelize, sequelize} = require('../db/connection');

const Task = sequelize.define('task', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      max: 20,
    },
  },
  description: {
    type: Sequelize.TEXT,
  },
  date: {
    type: Sequelize.DATE,
  },
  completed: {
    type: Sequelize.BOOLEAN,
  },
});

module.exports = Task;
