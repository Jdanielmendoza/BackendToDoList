import jwt from "jsonwebtoken";
import 'dotenv/config.js'; 

export const verifyAccesToken = (req,res , next ) => {
    const token = req.headers['x-access-token']; 
    try {
        const dataUser = jwt.verify(token , process.env.SECRET_KEY_TOKEN);
        req.idUser = dataUser.id ; 
        next() ; 
    } catch (error) {
        console.log(error.message);
        res.status(401).json({message: error.message});
    }

}

