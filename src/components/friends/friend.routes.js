import { Router } from "express";
import { verifyAccesToken } from "../../middlewares/verifyToken.js";
import { cancelFriendRequest, confirmFriendRequest, deniedFriendRequest, removeFromYourFriendList, sendFriendRequest, showAllUsers, showFriendRequest, showMyFriends, showSuggestionFriends } from "./friend.controller.js";


const routesFriend = Router() ; 
routesFriend.use(verifyAccesToken); 

routesFriend.get('/friend', showAllUsers); // mostrar todos los usuarios a poder conectar •
routesFriend.get('/friend/myfriends',showMyFriends)// mostrar mis amigos •
routesFriend.get('/friend/request',showFriendRequest ) //mostrar solicitudes de amistad• 
routesFriend.get('/friend/suggestion', showSuggestionFriends );// mostrar sugerencias de amigos 

routesFriend.post('/friend', sendFriendRequest); // enviar solicitud de amistad •
routesFriend.put('/friend', confirmFriendRequest); //aceptar solicitud de amistad• 

routesFriend.delete('/friend', removeFromYourFriendList)// eliminar un usuario de tu lista de amigos •
routesFriend.delete('/friend/denied', deniedFriendRequest); // rechazar solicitud de amistad  •
routesFriend.delete('/friend/cancel', cancelFriendRequest)//cancelar solicitud de amistad enviada •


export default routesFriend ; 