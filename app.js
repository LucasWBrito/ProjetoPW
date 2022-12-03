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
app.get('/api/v1/tasks', (req, res) => {
  res.render('main', db);
  //res.json(db);
});

app.post('/api/v1/tasks', (req, res) => {
  const {name} = req.body;
  console.log(req.body);
  let newID = db.tasks.length ? db.tasks[db.tasks.length - 1].id + 1 : 1;
  let newTask = {
    id: newID,
    name: name,
    completed: false,
  };
  db.tasks.push(newTask);
  writeFileSync('./db/db.json', JSON.stringify(db));
  res.redirect('/api/v1/tasks');
  //res.json(req.body);
});

app.get('/api/v1/tasks/edit/:id', (req, res) => {
  //render editTask
  let {id} = req.params;
  let task = db.tasks.find((task) => task.id == id);
  res.render('edit', task);
});

app.patch('/api/v1/tasks/complete/:id', (req, res) => {
  // completeTask
  const {id} = req.params;
  let taskIndex = db.tasks.findIndex((task) => task.id == id);
  if (db.tasks[taskIndex].completed) db.tasks[taskIndex].completed = false;
  else db.tasks[taskIndex].completed = true;
  writeFileSync('./db/db.json', JSON.stringify(db));
  res.redirect('/api/v1/tasks');
});

app.put('/api/v1/tasks/edit/:id', (req, res) => {
  // editTask
  const {id} = req.params;
  const {name, completed} = req.body;
  console.log(name);
  let taskIndex = db.tasks.findIndex((task) => task.id == id);
  console.log(taskIndex);
  console.log(db.tasks[taskIndex]);
  db.tasks[taskIndex].name = name;
  db.tasks[taskIndex].completed = completed;
  console.log(db.tasks[taskIndex]);
  writeFileSync('./db/db.json', JSON.stringify(db));
  res.redirect('/api/v1/tasks');
});

app.delete('/api/v1/tasks/:id', (req, res) => {
  const {id} = req.params;
  let taskIndex = db.tasks.findIndex((task) => task.id == id);
  db.tasks.splice(taskIndex, 1);
  writeFileSync('./db/db.json', JSON.stringify(db));
  res.redirect('/api/v1/tasks');
});

//app.get('/api/v1/tasks)         -lista todas tarefas
//app.post('/api/v1/tasks')       -cria nova tarefa
//app.get('/api/v1/tasks/edit')     -mostra detalhes task
//app.patch('/api/v1/tasks/complete:id')   -completaTask
//app.put('/api/v1/tasks/edit:id')   -modifica tarefa
//app.delete('/api/v1/tarefas:id')    -deleta tarefa

app.listen(port, console.log(`Server listening on ${port}`));
