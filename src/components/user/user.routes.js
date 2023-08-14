import { Router } from "express";
import { getUsers , createUser , updateUserPassword} from "./user.controller.js";
import { verifyAccesToken } from "../../middlewares/verifyToken.js";
const routerUser = Router(); 


routerUser.get('/user', getUsers );
routerUser.post('/user', createUser );
routerUser.put('/user', verifyAccesToken, updateUserPassword );

export default routerUser ; 