import {
  getAllMyTasks,
  createOneTask,
  updateOneTask,
  deleteOneTask,
  getOneTask,
  getAllTasks,
  getOneTaskForFriend,
  updateOneTaskForFriend,
  getAllTasksAssignedToMe,
} from "./task.model.js";
import { v4 as uuidv4 } from "uuid";

const getTask = async (req, res) => {
  try {
    const idUser = req.idUser;
    const Result = await getAllMyTasks(idUser);
    res.status(200).json(Result);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving tasks" });
  }
};

const getTaskById = async (req, res) => {
  const { idTask } = req.params;
  try {
    const Result = await getOneTask(idTask);
    res.status(200).json(Result);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error obteniendo una tarea", error: error.message });
  }
};

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
    res
      .status(500)
      .json({ message: "Error updating task", error: error.message });
  }
};

const deleteTask = async (req, res) => {
  const { idTask } = req.params;
  try {
    const result = await deleteOneTask(idTask);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting task", error: error.message });
  }
};

//-------------------------------------------------------------------------
//-------------------para los amigos --------------------------------------
const getTaskForFriends = async (req, res) => {
  console.log("------------------get Task For Friends ----------------------------");

  // devuelve todas las tareas que asigne excepto las mias.
  try {
    const idUser = req.idUser;
    const Result = await getAllTasks(idUser);
    res.status(200).json(Result);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving tasks" });
  }
};

const getTaskFriendById = async (req, res) => {
  console.log("------------------get Task Friend By Id----------------------------");

  // obtiene una tarea y mme muestra los amigos a los que
  //asigne la tarea
  const { idTask } = req.params;
  try {
    const Result = await getOneTaskForFriend(idTask);
    res.status(200).json(Result);
  } catch (error) {
    res.status(500).json({
      message: "Error obteniendo una tarea del amigo",
      error: error.message,
    });
  }
};

const updateTaskForFriend = async (req, res) => {
  console.log("------------------updating task for Friend----------------------------");

  try {
    const { idTask } = req.params;
    const idUser = req.idUser;
    const newTask = req.body;
    console.log(newTask);
    const result = await updateOneTaskForFriend(idUser, idTask, newTask);
    res.status(200).json({ message: "Task updated successfully", result });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating task", error: error.message });
  }
};

const updateTaskAssignedToMe = async (req, res) => {
  console.log("------------------updating task assigned to me ----------------------------");

  try {
    const { idTask } = req.params;
    const {idFriend} = req.body;
    const newTask = req.body;
    console.log(newTask);
    const result = await updateOneTaskForFriend(idFriend, idTask, newTask);
    res.status(200).json({ message: "Task updated successfully", result });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating task", error: error.message });
  }
};

const getTaskAssignedToMe = async (req, res) => {
  console.log("------------------get task assigned to me ----------------------------");

  // obtiene todas las tareas asignadas por otros usuario ...
  try {
    const idUser = req.idUser;
    const Result = await getAllTasksAssignedToMe(idUser);
    res.status(200).json(Result);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving tasks" });
  }
};

export {
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getTaskById,
  getTaskForFriends,
  getTaskFriendById,
  updateTaskForFriend,
  updateTaskAssignedToMe,
  getTaskAssignedToMe,
};
