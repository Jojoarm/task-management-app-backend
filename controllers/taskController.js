//add a new task
//get all tasks by userId
//delete a task
// edit a task

const Joi = require('joi');
const Task = require('../models/task');

//validation
const taskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.string().required(),
  userId: Joi.string().required(),
  priority: Joi.string().required(),
});

const createTask = async (req, res) => {
  const { title, description, status, userId, priority } = req.body;
  const { error } = taskSchema.validate({
    title,
    description,
    status,
    userId,
    priority,
  });
  if (error) {
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  }

  try {
    const task = await Task.create({
      title,
      description,
      status,
      userId,
      priority,
    });
    if (task) {
      return res.status(200).json({
        success: true,
        message: 'Task successfully created',
        data: task,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }
};

const getTasks = async (req, res) => {
  const { id } = req.params;
  try {
    const tasks = await Task.find({ userId: id });
    if (tasks) {
      return res.status(200).json({
        success: true,
        message: 'Tasks successfully fetched',
        data: tasks,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }
};

const updateTask = async (req, res) => {
  const { title, description, status, priority, userId, _id } = req.body;

  try {
    const updateTask = await Task.findByIdAndUpdate(
      { _id },
      { title, description, status, priority, userId },
      { new: true }
    );
    if (updateTask) {
      return res.status(200).json({
        success: true,
        message: 'Task successfully updated',
        data: updateTask,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Unable to update task',
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      res.status(400).json({
        success: false,
        message: 'Task Id is required',
      });
    }
    const deleteTask = await Task.findByIdAndDelete(id);
    if (deleteTask) {
      return res
        .status(200)
        .json({ success: true, message: 'Task deleted successfully' });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Unable to delete task',
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }
};

module.exports = { createTask, getTasks, deleteTask, updateTask };
