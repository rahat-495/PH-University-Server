
import config from "../../config";
import { NewUser } from "./user.interfaces";
import { UsersModel } from "./user.model"

const createStudnetIntoDb = async (password : string , data : object) => {

    const user : NewUser = { role : "" , password : "" , id : "" } ;
    user.role = 'student' ;
    user.id = "2030100001" ;
    user.password = password || config.defaultPass as string ;

    const createNewUser = await UsersModel.create(user) ;
    if(createNewUser._id){
        data.id = createNewUser.id ;
        data.user = createNewUser._id ;
    }
    // return result ;
}

export const userService = {
    createStudnetIntoDb ,
}
