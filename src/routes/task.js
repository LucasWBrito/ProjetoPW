const express = require('express');
const router = express.Router();

const {
  getAllTasks,
  getTask,
  createTask,
  toggleTaskCompleted,
  updateTask,
  deleteTask,
} = require('../controllers/task');

router.get('/:userId/t', getAllTasks);
router.get('/:userId/t/:id', getTask);
router.post('/:userId/t', createTask);
router.patch('/:userId/t/:id', toggleTaskCompleted);
router.put('/:userId/t/:id', updateTask);
router.delete('/:userId/t/:id', deleteTask);

module.exports = router;
