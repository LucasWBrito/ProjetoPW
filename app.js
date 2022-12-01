const express = require('express');
const {readFileSync, writeFileSync} = require('fs');

const app = express();

const port = 3000;

//middleware
app.use(express.json());

// routes
app.get('/api/v1/tarefas', (req, res) => {
  res.json(db.tarefas);
});

app.post('/api/v1/tarefas', (req, res) => {
  const {tarefa, terminado} = req.body;
  const db = JSON.parse(readFileSync('./db/db.json', 'utf-8'));
  console.log(db.tarefas.length);
  let novaTarefa = {
    id: db.tarefas.length + 1,
    tarefa: tarefa,
    terminado: terminado,
  };
  db.tarefas.push(novaTarefa);
  writeFileSync('./db/db.json', JSON.stringify(db));
  res.end();
});

app.get('/api/v1/tarefas/:id', (req, res) => {
  res.json({id: req.params.id});
});

app.patch('/api/v1/tarefas/:id', (req, res) => {
  res.json({id: req.params.id});
});

app.delete('/api/v1/tarefas/:id', (req, res) => {
  res.json({id: req.params.id});
});

//app.get('/api/v1/tarefas)         -lista todas tarefas
//app.post('/api/v1/tarefas')       -cria nova tarefa
//app.get('/api/v1/tarefas:id')     -lista apenas 1 tarefa
//app.patch('/api/v1/tarefas:id')   -modifica tarefa
//app.post('/api/v1/tarefas:id')    -deleta tarefa

app.listen(port, console.log(`Server listening on ${port}`));
