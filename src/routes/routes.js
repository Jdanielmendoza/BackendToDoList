import { Router } from "express";
import taskRouter from "../components/task/task.routes.js";
import routerUser from "../components/user/user.routes.js";
import authRouter from "../services/auth/auth.routes.js";

const router = Router(); 
router.use('/',taskRouter);
router.use('/', routerUser); 
router.use('/auth',authRouter);

export default router; 
