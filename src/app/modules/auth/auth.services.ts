
import AppError from "../../errors/AppErrors";
import { UsersModel } from "../user/user.model";
import { TLoginUser } from "./auth.interface"

const loginUser = async (payload : TLoginUser) => {
    const user = await UsersModel.isUserAxistByCustomId(payload?.id) ;
    if(!user){
        throw new AppError(404 , "The user is not found !") ;
    }
    
    const isDeleted = user?.isDeleted ;
    if(isDeleted){
        throw new AppError(400 , "The user is deleted !") ;
    }
    
    const userStatus = user?.status ;
    if(userStatus === "blocked"){
        throw new AppError(400 , "The user is already blocked !") ;
    }

    const isPasswordMatched = await UsersModel.isPasswordMatched(payload?.password , user?.password) ;
    return {isPasswordMatched} ;
}

export const authServices = {
    loginUser ,
}
