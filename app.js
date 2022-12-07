const express = require('express');
const {readFileSync, writeFileSync} = require('fs');
const path = require('path');
const db = require('./db/db.json');
const app = express();

const port = 3000;

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static(path.join(__dirname, '/public')));
// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// routes

//getTasks
app.get('/api/v1/tasks', (req, res) => {
  res.render('main', db);
});
// createTask
app.post('/api/v1/tasks', (req, res) => {
  const {name} = req.body;
  let newID = db.tasks.length ? db.tasks[db.tasks.length - 1].id + 1 : 1;
  let newTask = {
    id: newID,
    name: name,
    completed: false,
  };
  db.tasks.push(newTask);
  writeFileSync('./db/db.json', JSON.stringify(db));
  res.redirect('/api/v1/tasks');
});
// getEditTask
app.get('/api/v1/tasks/edit/:id', (req, res) => {
  let {id} = req.params;
  let task = db.tasks.find((task) => task.id == id);
  res.render('edit', task);
});
// completeTask
app.patch('/api/v1/tasks/complete/:id', (req, res) => {
  const {id} = req.params;
  let taskIndex = db.tasks.findIndex((task) => task.id == id);
  if (db.tasks[taskIndex].completed) db.tasks[taskIndex].completed = false;
  else db.tasks[taskIndex].completed = true;
  writeFileSync('./db/db.json', JSON.stringify(db));
  res.status(200).json({completed: db.tasks[taskIndex].completed, url: '/api/v1/tasks/'});
});
// editTask
app.put('/api/v1/tasks/edit/:id', (req, res) => {
  const {id} = req.params;
  const {name, completed} = req.body;
  let taskIndex = db.tasks.findIndex((task) => task.id == id);

  db.tasks[taskIndex].name = name;
  db.tasks[taskIndex].completed = completed;

  writeFileSync('./db/db.json', JSON.stringify(db));
  res.status(200).json({url: `/api/v1/tasks/edit/${id}`});
});
// deleteTask
app.delete('/api/v1/tasks/delete/:id', (req, res) => {
  const {id} = req.params;
  let taskIndex = db.tasks.findIndex((task) => task.id == id);
  db.tasks.splice(taskIndex, 1);
  writeFileSync('./db/db.json', JSON.stringify(db));
  res.status(200).send('/api/v1/tasks');
});

//app.get('/api/v1/tasks)         -lista todas tarefas
//app.post('/api/v1/tasks')       -cria nova tarefa
//app.get('/api/v1/tasks/edit/:id')     -mostra detalhes task editar
//app.patch('/api/v1/tasks/complete:id')   -completeTask
//app.put('/api/v1/tasks/edit:id')   -modifica tarefa
//app.delete('/api/v1/tasks/delete/:id')    -deleta tarefa

app.listen(port, console.log(`Server listening on ${port}`));
