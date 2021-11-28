import Task from "../models/task.js";
import { asyncWrapper } from "../middleware/async.js";
import { createCustomError } from "../errors/custom-error.js";

export const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json({ tasks, length: tasks.length });
});

export const createTask = asyncWrapper(async (req, res) => {
  const newTask = new Task({
    ...req.body,
  });

  await newTask.save();
  res.status(201).json({ newTask });
});
export const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;
  const task = await Task.findOne({ _id: taskId });
  if (!task) {
    return next(createCustomError(`Task not found with id ${taskId}`, 404));
  }
  res.status(200).json({ task });
});

export const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(createCustomError(`Task not found with id ${taskId}`, 404));
  }
  res.status(200).json({ task });
});

export const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404));
  }
  res.status(200).json({ task });
});
