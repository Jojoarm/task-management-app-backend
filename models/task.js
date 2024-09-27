const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
  userId: String,
  priority: String,
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
