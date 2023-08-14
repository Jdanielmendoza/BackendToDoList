import { getAllUsers, createOneUser, updateOneUser } from "./user.model.js";
import bcrypt from "bcrypt";


export const getUsers = async (req, res) => {
  const users = await getAllUsers();
  res.send(users);
};

export const createUser = async (req, res) => {
  try {
    const result = await createOneUser(req.body);
    if (result.success) {
      res.status(201).send(result.message);
    } else {
      res.status(404).send(result.message);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateUserPassword = async (req, res) => {
  const { newPassword } = req.body;
  const idUser = req.idUser;
  const contraseña = await bcrypt.hash(newPassword,10);
  try {
    const result = await updateOneUser({idUser, contraseña});
    if (result.success) {
      res.status(200).send(result.message);
    } else {
      res.status(404).send(result.message);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
