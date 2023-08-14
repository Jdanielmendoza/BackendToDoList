import { pool } from "../../config/config.database.js";

const getOneTask = async (idTask) => {
  try {
    const cliente = await pool.connect();
    const result = await cliente.query("SELECT * FROM TAREA WHERE ID = $1", [idTask]);
    cliente.release() ; 
    return result.rows ; 
  } catch (error) {
    const message = "Error retrieving one task from database";
    console.log(message);
    throw new Error(message);
  }
};

const getAllTask = async (idUser) => {
  try {
    const cliente = await pool.connect();
    const res = await cliente.query(
      "select tarea.* from tarea,usuario where usuario.id = tarea.idusuario and usuario.id = $1 ",
      [idUser]
    );
    cliente.release();
    return res.rows;
  } catch (error) {
    const message = "Error retrieving tasks from database";
    console.log(message);
    throw new Error(message);
  }
};

const createOneTask = async (
  idUser,
  idTask,
  { Titulo, Descripcion, Color, Hecho, Importante }
) => {
  const cliente = await pool.connect();
  try {
    const FechaDeInicio = new Date(Date.now()) ; 
    const result = await cliente.query(
      "INSERT INTO TAREA VALUES ($1, $2,$3,$4,$5,$6,$7,$8)",
      [
        idTask,
        Titulo,
        Descripcion,
        FechaDeInicio,
        Color,
        Hecho,
        Importante,
        idUser,
      ]
    );
    //console.log(result);
    cliente.release();
    return {
      idTask,
      Titulo,
      Descripcion,
      FechaDeInicio,
      Color,
      Hecho,
      Importante,
    };
  } catch (error) {
    return { message: error.message };
  }
};

const updateOneTask = async (idTask, newTask) => {
  try {
    const { Titulo, Descripcion, Color, Hecho, Importante } =
      newTask;
    const cliente = await pool.connect();
    const result = await cliente.query(
      "UPDATE TAREA SET titulo = $1, descripcion = $2, Color= $3, Hecho = $4, importante = $5 WHERE id = $6",
      [Titulo, Descripcion, Color, Hecho, Importante, idTask]
    );
    cliente.release();
    return newTask;
  } catch (error) {
    const message = error.message;
    console.log(error.message);
    throw new Error(message);
  }
};

const deleteOneTask = async (idTask) => {
  try {
    const client = await pool.connect();
    const result = await client.query("DELETE FROM TAREA WHERE ID = $1", [
      idTask,
    ]);
    client.release();
    return result;
  } catch (error) {
    throw new Error("Error deleting task from database");
  }
};
export { getAllTask, createOneTask, updateOneTask, deleteOneTask , getOneTask};
