const express = require('express');
const {
  createTask,
  getTasks,
  deleteTask,
  updateTask,
} = require('../controllers/taskController');

const taskRouter = express.Router();

taskRouter.post('/create-task', createTask);
taskRouter.get('/tasks/:id', getTasks);
taskRouter.put('/update-task', updateTask);
taskRouter.delete('/delete-task/:id', deleteTask);

module.exports = taskRouter;
