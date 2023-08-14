import { getUserByName } from "../../components/user/user.model.js"

const alreadyUserExists = async(nameOfUser) =>{
    const result =await getUserByName(nameOfUser);
    return result!==undefined ;
}

export default alreadyUserExists ; 