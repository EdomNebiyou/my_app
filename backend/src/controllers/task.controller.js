const Task = require("../models/task.model")

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      user: req.userId
    }).sort({
      createdAt: -1
    })

    res.json(tasks)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

const createTask = async (req, res) => {
  try {
    const { title } = req.body

    if (!title || !title.trim()) {
      return res.status(400).json({
        message: "Title is required"
      })
    }

    const task = await Task.create({
      title,
      user: req.userId
    })

    res.status(201).json(task)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

const getTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.userId
    })

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      })
    }

    res.json(task)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

const updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.userId
      },
      req.body,
      {
        new: true
      }
    )

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      })
    }

    res.json(task)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.userId
    })

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      })
    }

    res.json({
      message: "Task deleted"
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

module.exports = {
  getTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask
}