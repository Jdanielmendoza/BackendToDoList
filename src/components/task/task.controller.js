import {
  getAllTask,
  createOneTask,
  updateOneTask,
  deleteOneTask,
  getOneTask,
} from "./task.model.js";
import { v4 as uuidv4 } from "uuid";

const getTask = async (req, res) => {
  try {
    const idUser = req.idUser;
    const Result = await getAllTask(idUser);
    res.status(200).json(Result);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving tasks" });
  }
};

const getTaskById = async (req,res) => {
  const {idTask} = req.params ; 
  try {
    const Result = await getOneTask(idTask) ; 
    res.status(200).json(Result);
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error: error.message });
  }
}

const createTask = async (req, res) => {
  try {
    const idUser = req.idUser;
    const idTask = uuidv4();
    const result = await createOneTask(idUser, idTask, req.body);
    res.status(201).json({ message: "Task created", result });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating task", error: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { idTask } = req.params;
    const newTask = req.body;
    const result = await updateOneTask(idTask, newTask);
    res.status(200).json({ message: "Task updated successfully", result });
  } catch (error) {
    res.status(500).json({message: "Error updating task", error: error.message});
  }
};

const deleteTask = async (req, res) => {
  const { idTask } = req.params;
  try {
    const result = await deleteOneTask(idTask);
    res.status(200).json({ message: "Task deleted successfully"});
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error: error.message });
  }
};

export { getTask, createTask, updateTask, deleteTask, getTaskById };
