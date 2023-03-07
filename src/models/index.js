const {sequelize} = require('../db/connection');
const User = require('./User');
const Task = require('./Task');

User.hasMany(Task);
Task.belongsTo(User);

/* (async () => {
  try {
    await sequelize.sync({force: true});
    console.log('Tabelas criadas com sucesso, comente o codigo');
  } catch (err) {
    console.log(err);
  }
})(); */

module.exports = {User: User, Task: Task};
