const express = require("express")

const {
  getTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask
} = require("../controllers/task.controller")

const protect = require("../middleware/auth.middleware")

const router = express.Router()

router.use(protect)

router.get("/", getTasks)

router.post("/", createTask)

router.get("/:id", getTask)

router.put("/:id", updateTask)

router.delete("/:id", deleteTask)

module.exports = router