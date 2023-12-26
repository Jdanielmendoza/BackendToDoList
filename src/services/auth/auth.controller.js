import {
  createOneUser,
  getUserByName,
} from "../../components/user/user.model.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config.js";
import alreadyUserExists from "../validations/alreadyUserExists.js";

export const registerUser = async (req, res) => {
  let { name, password , sexo } = req.body;
  name = name?.toLowerCase().trim(); 
  const userExists = await alreadyUserExists(name);
  if (!userExists) {
    const idUser = uuidv4();
    const passwordSecure = await bcrypt.hash(password, 10);
    const data = { idUser, nombre: name, contraseña: passwordSecure , sexo };
    const result = await createOneUser(data);
    const token = jwt.sign({ idUser, name }, process.env.SECRET_KEY_TOKEN, {
      expiresIn: "240h",
    });
    res.status(201).json({message:"User created", result, token, success:true });
  }else{
    res.status(409).json({message: "User already exists" ,  success:false});
  }
};

export const loginUser = async (req, res) => {
  let { name, password } = req.body;
  name = name?.toLowerCase().trim() ; 
  console.log("login " + name + " " + password);
  const result = await getUserByName(name);
  if (!!!result) {
    return res.status(404).json({ message: "User not found" , success:false}); // Not Found
  }

  try {
    const checkPassword = await bcrypt.compare(password, result.contraseña);

    if (!checkPassword) {
      return res.status(401).json({ message: "Incorrect password" ,  success:false}); // Unauthorized
    }

    const token = jwt.sign(
      { id: result.id, name },
      process.env.SECRET_KEY_TOKEN,
      {
        expiresIn: "48h",
      }
    );

    return res.status(200).json({ message: "Login successful", token , success:true , name, id:result?.id });
  } catch (error) {
    return res.status(500).json({ message: error.message ,success:false}); // Internal Server Error
  }
};
