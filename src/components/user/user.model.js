import { pool } from "../../config/config.database.js";

export const getAllUsers = async () => {
  const client = await pool.connect(); // Usar await para obtener el cliente desde el pool
  const result = await pool.query("SELECT id,nombre,sexo FROM USUARIO ");
  client.release(); // Llamar a release() en el cliente para liberarlo
  return result.rows;
};

export const createOneUser = async ({ idUser, nombre, contraseña, sexo }) => {
  try {
    const client = await pool.connect();
    try {
      const result = await pool.query(
        "INSERT INTO USUARIO(Id, Nombre ,Contraseña, sexo ) VALUES ($1, $2, $3, $4)",
        [idUser, nombre, contraseña, sexo]
      );
    } catch (error) {
      return error;
    }
    client.release();
    return { nombre };
  } catch (error) {
    return { error: error.message };
  }
};

export const updateOneUser = async ({ idUser, contraseña }) => {
  //change password
  try {
    const client = await pool.connect();
    const result = await pool.query(
      "UPDATE USUARIO SET Contraseña= $1 WHERE Id = $2",
      [contraseña, idUser]
    );
    client.release();
    return { success: true, message: "contraseña actualizada exitosamente" };
  } catch (error) {
    return { success: false, message: "Error:Model::usuario:updating", error };
  }
};

export const deleteOneUser = async ({ idUser, nombre, contraseña }) => {
  try {
    const client = await pool.connect();
    const result = await pool.query("DELETE FROM USUARIO WHERE Id = $1", [
      idUser,
    ]);
    client.release();
    return { success: true, message: "Usuario actualizado exitosamente" };
  } catch (error) {
    return { success: false, message: "Error:Model::usuario:updating", error };
  }
};

export const getUserByName = async (nombre = "") => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      "SELECT * FROM USUARIO WHERE NOMBRE = $1",
      [nombre]
    );
    return result.rows[0];
  } catch (error) {
    console.log(error.message);
    return error;
  } finally {
    client.release();
  }
};

/*  export const getUserById = async( idUser ) => { 
    const client =await pool.connect() ;
    try {
      const result = await client.query('SELECT * FROM USUARIO WHERE NOMBRE = $1',[nombre]);
      client.release; 
      return result.rows[0] ;
    } catch (error) {
      console.log(error.message);
      return error ; 
    }
  } */

export const getAllUsersGroup = async (arregloDeUsuarios) => {
  const client = await pool.connect(); // Usar await para obtener el cliente desde el pool
  try {
    const result = await pool.query(
      "SELECT id, nombre, sexo FROM USUARIO WHERE ID = ANY ($1); ",
      [arregloDeUsuarios]
    );
    client.release(); // Llamar a release() en el cliente para liberarlo
    return result.rows;
  } catch (error) {
    console.log(error);
    client.release();
    return error;
  }
};
