const express = require('express');
const app = express();
const path = require('path');
const userRoutes = require('./src/routes/user');
const taskRoutes = require('./src/routes/task');
require('dotenv').config();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '/src/public')));
app.use(express.json());

app.use('/api/v1/u', taskRoutes);
app.use('/api/v1', userRoutes);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
