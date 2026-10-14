const express = require("express");

const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask
} = require("../controllers/taskController");

const router = express.Router();

router.route("/")
  .get(getTasks)
  .post(createTask);

router.route("/:id")
  .get(getTask)
  .put(updateTask)
  .delete(deleteTask);

router.patch("/:id/status", updateTaskStatus);

module.exports = router;