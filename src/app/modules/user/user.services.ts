
import { UsersModel } from "./user.model"

const createStudnetIntoDb = async (data : object) => {
    const result = await UsersModel.create(data) ;
    return result ;
}

export const userService = {
    createStudnetIntoDb ,
}
