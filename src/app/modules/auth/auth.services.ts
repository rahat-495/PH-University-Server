
import AppError from "../../errors/AppErrors";
import { UsersModel } from "../user/user.model";
import { TLoginUser } from "./auth.interface"
import bcrypt from "bcryptjs"

const loginUser = async (payload : TLoginUser) => {
    const user = await UsersModel.isUserAxistByCustomId(payload?.id) ;
    if(!user){
        throw new AppError(404 , "The user is not found !") ;
    }
    
    // const isDeleted = isUserAxist?.isDeleted ;
    // if(isDeleted){
    //     throw new AppError(400 , "The user is deleted !") ;
    // }
    
    // const userStatus = isUserAxist?.status ;
    // if(userStatus === "blocked"){
    //     throw new AppError(400 , "The user is already blocked !") ;
    // }

    // const isPasswordMatched = await bcrypt.compare(payload?.password , isUserAxist?.password) ;

    return null ;
}

export const authServices = {
    loginUser ,
}
