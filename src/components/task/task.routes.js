import { Router } from "express";
import { getTask , createTask, updateTask, deleteTask, getTaskById, getTaskForFriends, getTaskFriendById, updateTaskForFriend, getTaskAssignedToMe, updateTaskAssignedToMe } from "./task.controller.js";
import { verifyAccesToken } from "../../middlewares/verifyToken.js";

const taskRouter = Router() ; 
//taskRouter.use(verifyAccesToken) ; 

taskRouter.get('/task',verifyAccesToken, getTask );
taskRouter.get('/task/:idTask',verifyAccesToken, getTaskById)
taskRouter.post('/task',verifyAccesToken, createTask);
taskRouter.put('/task/:idTask', verifyAccesToken, updateTask);
taskRouter.delete('/task/:idTask',verifyAccesToken, deleteTask);

// RUTAS PARA MANEJAR LAS TAREAS DE LOS AMIGOS 
taskRouter.get('/taskfriend',verifyAccesToken, getTaskForFriends );
taskRouter.get('/taskfriend/:idTask',verifyAccesToken, getTaskFriendById); 
taskRouter.put('/taskfriend/:idTask', verifyAccesToken, updateTaskForFriend);
taskRouter.put('/taskassignedtome/:idTask', verifyAccesToken, updateTaskAssignedToMe);

taskRouter.get('/tasksassignedtome',verifyAccesToken, getTaskAssignedToMe );


export default taskRouter; 