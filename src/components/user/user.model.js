import { pool } from "../../config/config.database.js";

export const getAllUsers = async () => {
  const client = pool.connect();
  const result = await pool.query("SELECT * FROM USUARIO ");
  await client.release();
  return result.rows;
};

export const createOneUser = async ({ idUser, nombre, contraseña }) => {
  try {
    const client = await pool.connect();
    const result = await pool.query(
      "INSERT INTO USUARIO(Id, Nombre ,Contraseña ) VALUES ($1, $2, $3)",
      [idUser, nombre, contraseña]
    );
    client.release();
    return {nombre}
  } catch (error) {
    return { error: error.message }
  }
};

export const updateOneUser = async ({ idUser, contraseña }) => {//change password
    try {
      const client = await pool.connect();
      const result = await pool.query(
        "UPDATE USUARIO SET Contraseña= $1 WHERE Id = $2",
        [ contraseña, idUser]
      );
      client.release();
      return { success: true, message: "Usuario actualizado exitosamente" }
    } catch (error) {
      return { success: false, message: "Error:Model::usuario:updating" ,error}
    }
  };


  export const deleteOneUser = async ({ idUser, nombre, contraseña }) => {
    try {
      const client = await pool.connect();
      const result = await pool.query(
        "DELETE FROM USUARIO WHERE Id = $1",
        [idUser]
      );
      client.release();
      return { success: true, message: "Usuario actualizado exitosamente" }
    } catch (error) {
      return { success: false, message: "Error:Model::usuario:updating" ,error}
    }
  };

  export const getUserByName = async( nombre='' ) => { 
    const client =await pool.connect() ;
    try {
      const result = await client.query('SELECT * FROM USUARIO WHERE NOMBRE = $1',[nombre]);
      return result.rows[0] ;
    } catch (error) {
      console.log(error.message);
      return error ; 
    } finally{
      client.release(); 
    }
  }


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
