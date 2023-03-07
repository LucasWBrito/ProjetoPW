const {Task} = require('../models/index');

const getAllTasks = async (req, res) => {
  try {
    console.log(req.params.userId);
    const tasks = await Task.findAll({
      where: {
        userId: req.params.userId,
      },
      order: ['date'],
    });
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.json({error: err.message});
  }
};

const getTask = async (req, res) => {
  try {
    const task = await Task.findOne({where: {userId: req.params.userId, id: req.params.id}});
    res.json(task);
  } catch (err) {
    console.error(err);
    res.json({error: err.message});
  }
};

const createTask = async (req, res) => {
  try {
    await Task.create({
      title: req.body.title,
      description: '',
      date: req.body.date || Date.now(),
      completed: req.body.completed || false,
      userId: req.params.userId,
    });
    res.json({message: 'Tarefa criada com sucesso'});
  } catch (err) {
    console.error(err);
    res.json({message: err.message});
  }
};
const toggleTaskCompleted = async (req, res) => {
  try {
    const task = await Task.findOne({where: {userId: req.params.userId, id: req.params.id}});

    if (task.completed) {
      await Task.update(
        {completed: false},
        {where: {userId: req.params.userId, id: req.params.id}}
      );
    } else {
      await Task.update({completed: true}, {where: {userId: req.params.userId, id: req.params.id}});
    }
    res.json({message: 'success'});
  } catch (err) {
    console.error(err);
    res.json({message: err.message});
  }
};
const updateTask = async (req, res) => {
  try {
    await Task.update(
      {
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        completed: req.body.completed,
      },
      {where: {userId: req.params.userId, id: req.params.id}}
    );
    res.json({success: true});
  } catch (err) {
    console.error(err);
    res.json({err});
  }
};
const deleteTask = async (req, res) => {
  try {
    await Task.destroy({where: {userId: req.params.userId, id: req.params.id}});
    res.json({success: true});
  } catch (err) {
    console.error(err);
    res.json({err});
  }
};

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  toggleTaskCompleted,
  updateTask,
  deleteTask,
};
