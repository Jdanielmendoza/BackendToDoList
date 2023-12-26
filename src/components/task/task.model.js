import { pool } from "../../config/config.database.js";

const getOneTask = async (idTask) => {
  try {
    const cliente = await pool.connect();
    const result = await cliente.query("SELECT * FROM TAREA WHERE ID = $1", [
      idTask,
    ]);
    cliente.release();
    return result.rows;
  } catch (error) {
    const message = "Error retrieving one task from database";
    console.log(message);
    throw new Error(message);
  }
};

const getAllMyTasks = async (idUser) => {
  try {
    const cliente = await pool.connect();
    const res = await cliente.query(
      "SELECT Id, Titulo, Descripcion, FechaDeInicio AT TIME ZONE 'America/La_Paz' as FechaDeInicio, Color, Hecho, Importante FROM BANDEJA, TAREA WHERE BANDEJA.id_tarea =Tarea.id and id_usuario = $1 and id_amigo = $2 ;",
      [idUser, idUser]
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
  { Titulo, Descripcion, Color, Hecho, Importante, personas_tareas }
) => {
  const cliente = await pool.connect();
  try {
    const result = await cliente.query(
      "SELECT crearbandejaYTarea($1, $2, $3, $4, $5, $6, $7, $8::JSONB )",
      [
        idTask,
        idUser,
        Titulo,
        Descripcion,
        Color,
        Hecho,
        Importante,
        JSON.stringify(personas_tareas),
      ]
    );
    console.log(result);
    cliente.release();
    return {
      idTask,
      Titulo,
      Descripcion,
      Color,
      Hecho,
      Importante,
    };
  } catch (error) {
    console.log(error);
    return { message: error.message };
  }
};

const updateOneTask = async (idTask, newTask) => {
  try {
    const { Titulo, Descripcion, Color, Hecho, Importante } = newTask;
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

//----------------------------------------------------------------------------
//-------------------rutas para manejar las tareas de los amigos ------------
const getAllTasks = async (idUser) => {
  // devuelve todas las tareas que asigne excepto las mias
  try {
    const cliente = await pool.connect();
    const res = await cliente.query(
      "SELECT count(tarea.id) as cant_usuarios_asignados, TAREA.Id as id_tarea, Titulo, Descripcion, FechaDeInicio AT TIME ZONE 'America/La_Paz' as FechaDeInicio, Color, Hecho, Importante FROM BANDEJA ,TAREA WHERE BANDEJA.id_tarea =Tarea.id and id_usuario = $1 and id_amigo <> id_usuario GROUP BY TAREA.ID; ",
      [idUser]
    );
    cliente.release();
    return res.rows;
  } catch (error) {
    const message = "Error retrieving tasks from database";
    console.log(message);
    console.log(error);
    throw new Error(message);
  }
};

const getOneTaskForFriend = async (idTask) => {
  // obtiene una tarea que asigne a mis amigos
  try {
    const cliente = await pool.connect();
    const result = await cliente.query(
      "SELECT U2.ID, U2.NOMBRE , U2.SEXO , TAREA.Id as id_tarea, Titulo, Descripcion, FechaDeInicio AT TIME ZONE 'America/La_Paz' as FechaDeInicio, Color, Hecho, Importante FROM BANDEJA, TAREA, USUARIO U1, USUARIO U2 WHERE BANDEJA.id_tarea =Tarea.id AND U1.ID = BANDEJA.ID_USUARIO AND U2.ID = BANDEJA.ID_AMIGO and TAREA.ID = $1 ;",
      [idTask]
    );
    cliente.release();
    return result.rows;
  } catch (error) {
    const message = "Error retrieving one task from database";
    console.log(message);
    throw new Error(message);
  }
};

const updateOneTaskForFriend = async ( idUser,
  idTask,
  { Titulo, Descripcion, Color, Hecho, Importante, personas_tareas }) => {
  try {
    const cliente = await pool.connect();
    const result = await cliente.query(
      "SELECT actualizarBandejaYTarea($1, $2, $3, $4, $5, $6, $7, $8::JSONB )",
      [
        idTask,
        idUser,
        Titulo,
        Descripcion,
        Color,
        Hecho,
        Importante,
        JSON.stringify(personas_tareas),
      ]
    );
    console.log(result);
    cliente.release();
    return result;
  } catch (error) {
    const message = error.message;
    console.log(error);
    throw new Error(message);
  }
};


//-------------------------------------------------------------------------------------
const getAllTasksAssignedToMe = async (idUser) => {
  // devuelve todas las tareas que asigne excepto las mias
  try {
    const cliente = await pool.connect();
    const res = await cliente.query(
      "SELECT U1.ID, U1.NOMBRE, U1.SEXO, TAREA.Id as id_tarea, Titulo, Descripcion, FechaDeInicio AT TIME ZONE 'America/La_Paz' as FechaDeInicio, Color, Hecho, Importante FROM BANDEJA, TAREA, USUARIO U1, USUARIO U2 WHERE BANDEJA.id_tarea =Tarea.id AND U1.ID = BANDEJA.ID_USUARIO AND U2.ID = BANDEJA.ID_AMIGO and id_amigo = $1 AND u1.id <> u2.id ;",
      [idUser]
    );
    cliente.release();
    return res.rows;
  } catch (error) {
    const message = "Error retrieving tasks from database";
    console.log(message);
    console.log(error);
    throw new Error(message);
  }
};







export {
  getAllMyTasks,
  createOneTask,
  updateOneTask,
  deleteOneTask,
  getOneTask,
  getAllTasks,
  getOneTaskForFriend,
  updateOneTaskForFriend,
  getAllTasksAssignedToMe
};
