
import config from "../../config";
import { TUser } from "./user.interfaces";
import { UsersModel } from "./user.model";

const createStudnetIntoDb = async (password : string , data : object) => {

    const userData : Partial<TUser> = {} ;
    userData.role = 'student' ;
    userData.id = "2030100001" ;
    userData.password = password || config.defaultPass as string ;

    const createNewUser = await UsersModel.create(userData) ;
    if(createNewUser._id){
        // data.id = createNewUser.id ;
        // data.user = createNewUser._id ;
    }
    // return result ;
}

export const userService = {
    createStudnetIntoDb ,
}
