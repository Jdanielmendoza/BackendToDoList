import Grafo from "../../services/grafos/Grafo.js";
import { getAllUsers, getAllUsersGroup } from "../user/user.model.js";
import {
  acceptFriendRequestModel,
  cancelFriendRequestModel,
  deniedFriendRequestModel,
  getAllFriendRequest,
  getAllMyFriends,
  getAllUsersToConnect,
  removeFromYourFriendListModel,
  sendFriendRequestModel,
} from "./friend.model.js";

export const showAllUsers = async (req, res) => {
  try {
    const iduser = req.idUser;
    const response = await getAllUsersToConnect(iduser);
    console.log(response);
    res.status(201).send(response);
  } catch (error) {
    console.log(error);
    res.status(404).send(error.message);
  }
};

export const showMyFriends = async (req, res) => {
  try {
    const iduser = req.idUser;
    const response = await getAllMyFriends(iduser);
    console.log(response);
    res.status(201).send(response);
  } catch (error) {
    console.log(error);
    res.status(404).send(error.message);
  }
};

export const showFriendRequest = async (req, res) => {
  try {
    const iduser = req.idUser;
    const response = await getAllFriendRequest(iduser);
    console.log(response);
    res.status(201).send(response);
  } catch (error) {
    console.log(error);
    res.status(404).send(error.message);
  }
};

export const showSuggestionFriends = async (req, res) => {
  // Uso de grafos para sugerir amigos
  try {
    const iduser = req.idUser;
    console.log("Mostrando sugerencias de amigos al usuario");
    console.log(iduser);
    const usuarios = await getAllUsers();
    const grafo = new Grafo(usuarios);
    for (const user of usuarios) {
      // Por cada usuario, obtener sus amigos
      const amigos = await getAllMyFriends(user?.id);
      for (const amigo of amigos) {
        grafo.insertarArista(user?.id, amigo.id);
      }
    }

    console.log(grafo.toString());
    const codigoDeAmigosSugeridos = grafo.sugerenciaDeAmigos(iduser); 

    const amigosSugeridos = await getAllUsersGroup(codigoDeAmigosSugeridos);

    res.status(201).send(amigosSugeridos);
  } catch (error) {
    console.log(error);
    res.status(404).send(error.message);
  }
};

export const sendFriendRequest = async (req, res) => {
  try {
    const iduser = req.idUser;
    const { idFriend } = req.body;
    console.log({ iduser, idFriend });
    const response = await sendFriendRequestModel(iduser, idFriend);
    console.log(response);
    res.status(201).send(response);
  } catch (error) {
    console.log(error);
    res.status(404).send(error.message);
  }
};

export const confirmFriendRequest = async (req, res) => {
  // aceptar solicitud de amistad
  try {
    const iduser = req.idUser;
    const { idFriend } = req.body;
    console.log({ iduser, idFriend });
    const response = await acceptFriendRequestModel(iduser, idFriend);
    console.log(response);
    res.status(201).send(response);
  } catch (error) {
    console.log(error);
    res.status(404).send(error.message);
  }
};

export const removeFromYourFriendList = async (req, res) => {
  try {
    const iduser = req.idUser;
    const { idFriend } = req.query;
    console.log("eliminando de tu lista de amigos ");
    console.log({ iduser, idFriend });
    const response = await removeFromYourFriendListModel(iduser, idFriend);
    console.log(response);
    res.status(201).send(response);
  } catch (error) {
    console.log(error);
    res.status(404).send(error.message);
  }
};

export const deniedFriendRequest = async (req, res) => {
  try {
    const iduser = req.idUser;
    const { idFriend } = req.query;
    console.log("denegando solicitud de amistad");
    console.log({ iduser, idFriend });
    const response = await deniedFriendRequestModel(iduser, idFriend);
    console.log(response);
    res.status(201).send(response);
  } catch (error) {
    console.log(error);
    res.status(404).send(error.message);
  }
};

export const cancelFriendRequest = async (req, res) => {
  try {
    const iduser = req.idUser;
    const { idFriend } = req.query;
    console.log("cancelando solicitud de amistad enviada");
    console.log({ iduser, idFriend });
    const response = await cancelFriendRequestModel(iduser, idFriend);
    console.log(response);
    res.status(201).send(response);
  } catch (error) {
    console.log(error);
    res.status(404).send(error.message);
  }
};
