const mongoose = require("mongoose");
const Task = require("../models/Task");

// Get all tasks and search tasks
exports.getTasks = async (req, res, next) => {
  try {
    const search = req.query.search?.trim();

    const filter = search
      ? {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } }
          ]
        }
      : {};

    const tasks = await Task.find(filter).sort({ createdAt: -1 });

    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

// Get one task
exports.getTask = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: "Invalid task ID" });
    }

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

// Create task
exports.createTask = async (req, res, next) => {
  try {
    const { title, description = "", completed = false } = req.body;

    if (typeof title !== "string" || !title.trim()) {
      return res.status(400).json({
        error: "Task title is required"
      });
    }

    if (typeof description !== "string") {
      return res.status(400).json({
        error: "Description must be a string"
      });
    }

    if (typeof completed !== "boolean") {
      return res.status(400).json({
        error: "Completed must be true or false"
      });
    }

    const task = await Task.create({
      title: title.trim(),
      description: description.trim(),
      completed
    });

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

// Update task details
exports.updateTask = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: "Invalid task ID" });
    }

    const { title, description = "", completed = false } = req.body;

    if (typeof title !== "string" || !title.trim()) {
      return res.status(400).json({
        error: "Task title is required"
      });
    }

    if (typeof description !== "string") {
      return res.status(400).json({
        error: "Description must be a string"
      });
    }

    if (typeof completed !== "boolean") {
      return res.status(400).json({
        error: "Completed must be true or false"
      });
    }

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title: title.trim(),
        description: description.trim(),
        completed
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

// Update completion status
exports.updateTaskStatus = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: "Invalid task ID" });
    }

    if (typeof req.body.completed !== "boolean") {
      return res.status(400).json({
        error: "Completed must be true or false"
      });
    }

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { completed: req.body.completed },
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

// Delete task
exports.deleteTask = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: "Invalid task ID" });
    }

    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};