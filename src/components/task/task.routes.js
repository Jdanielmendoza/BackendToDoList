import { Router } from "express";
import { getTask , createTask, updateTask, deleteTask, getTaskById } from "./task.controller.js";
import { verifyAccesToken } from "../../middlewares/verifyToken.js";

const taskRouter = Router() ; 
//taskRouter.use(verifyAccesToken) ; 

taskRouter.get('/task',verifyAccesToken, getTask );
taskRouter.get('/task/:idTask',verifyAccesToken, getTaskById)
taskRouter.post('/task',verifyAccesToken, createTask);
taskRouter.put('/task/:idTask', verifyAccesToken, updateTask);
taskRouter.delete('/task/:idTask',verifyAccesToken, deleteTask);


export default taskRouter; 