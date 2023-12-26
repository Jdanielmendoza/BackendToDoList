import { pool } from "../../config/config.database.js";


export const getAllUsersToConnect = async (iduser) => {
  const client = await pool.connect(); // Usar await para obtener el cliente desde el pool
  try {
    const result = await pool.query(
      "SELECT ID, NOMBRE , SEXO FROM USUARIO WHERE ID NOT IN ( SELECT ID_AMIGO FROM AMIGO WHERE ID_USUARIO = $1 ) AND ID <> $2; ",
      [iduser, iduser]
    );
    client.release(); // Llamar a release() en el cliente para liberarlo
    return result.rows;
  } catch (error) {
    console.log(error);
    client.release();
    return error;
  }
};

export const getAllMyFriends = async (iduser) => {
  const client = await pool.connect(); // Usar await para obtener el cliente desde el pool
  try {
    const result = await pool.query(
      "SELECT U2.ID, U2.NOMBRE , U2.SEXO, AMIGO.ESTADO_SOLICITUD  FROM AMIGO ,USUARIO U1, USUARIO U2 WHERE U1.ID = AMIGO.ID_USUARIO AND U2.ID = AMIGO.ID_AMIGO AND U1.ID = $1;",
      [iduser]
    );
    client.release(); // Llamar a release() en el cliente para liberarlo
    return result.rows;
  } catch (error) {
    console.log(error);
    client.release();
    return error;
  }
};

export const getAllFriendRequest = async (iduser) => {
  //obtener solicitudes de amistad .  LAS SOLICITUDES QUE DEVUELVE SON LAS PENDIENTES
  const client = await pool.connect(); // Usar await para obtener el cliente desde el pool
  try {
    const result = await pool.query(
      "SELECT U1.ID, U1.NOMBRE , U1.SEXO,AMIGO.FECHA FROM AMIGO ,USUARIO U1, USUARIO U2 WHERE U1.ID = AMIGO.ID_USUARIO AND U2.ID = AMIGO.ID_AMIGO AND U2.ID = $1 AND AMIGO.ESTADO_SOLICITUD = 'pendiente';",
      [iduser]
    );
    client.release(); // Llamar a release() en el cliente para liberarlo
    return result.rows;
  } catch (error) {
    console.log(error);
    client.release();
    return error;
  }
};

export const sendFriendRequestModel = async (idUser, idFriend) => {
  //enviar solicitudes de amistad
  const client = await pool.connect(); // Usar await para obtener el cliente desde el pool
  try {
    const result = await pool.query(
      "SELECT enviarSolicitudDeAmistad( $1, $2 )",
      [idUser, idFriend]
    );
    client.release(); // Llamar a release() en el cliente para liberarlo
    return result.rows;
  } catch (error) {
    console.log(error);
    client.release();
    return error;
  }
};

export const acceptFriendRequestModel = async (idUser, idFriend) => {
    //aceptar solicitudes de amistad
    const client = await pool.connect(); // Usar await para obtener el cliente desde el pool
    try {
      const result = await pool.query(
        "SELECT aceptarSolicitudDeAmistad( $1, $2 )",
        [idUser, idFriend]
      );
      client.release(); // Llamar a release() en el cliente para liberarlo
      return result.rows;
    } catch (error) {
      console.log(error);
      client.release();
      return error;
    }
  };

  export const removeFromYourFriendListModel = async (idUser, idFriend) => {
    //eliminar un usuario de tu lista de amigos 
    const client = await pool.connect();
    try {
      const result = await pool.query(
        "SELECT eliminarDeTuListaDeAmigos( $1, $2 )",
        [idUser, idFriend]
      );
      client.release(); 
      return result.rows;
    } catch (error) {
      console.log(error);
      client.release();
      return error;
    }
  };
  


export const deniedFriendRequestModel = async (idUser, idFriend) => {
    //rechazar una solicitud de amistad
    const client = await pool.connect();
    try {
      const result = await pool.query(
        "SELECT rechazarOCancelarSolicitudDeAmistad( $1, $2 )",
        [idFriend, idUser]
      );
      client.release(); 
      return result.rows;
    } catch (error) {
      console.log(error);
      client.release();
      return error;
    }
  };

  export const cancelFriendRequestModel = async (idUser, idFriend) => {
    //cancelar una solicitud de amistad enviada 
    const client = await pool.connect();
    try {
      const result = await pool.query(
        "SELECT rechazarOCancelarSolicitudDeAmistad( $1, $2 )",
        [idUser,idFriend]
      );
      client.release(); 
      return result.rows;
    } catch (error) {
      console.log(error);
      client.release();
      return error;
    }
  };  