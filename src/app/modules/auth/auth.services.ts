
import config from "../../config";
import AppError from "../../errors/AppErrors";
import { UsersModel } from "../user/user.model";
import { TLoginUser, TPasswordData } from "./auth.interface"
import jwt, { JwtPayload } from "jsonwebtoken" ;

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
    
    if(!await UsersModel.isPasswordMatched(payload?.password , user?.password)){
        throw new AppError(400 , "The password is not matched !") ;
    }

    const jwtPayload = { userId : user?.id , role : user?.role }
    const accesstoken = jwt.sign( jwtPayload , config.jwtAccessSecret as string , { expiresIn : "10d" } ) ;
    return { accesstoken , needsPasswordChange : user?.needsPasswordChange } ;
}

const changePasswordIntoDb = async (user : JwtPayload , payload : TPasswordData) => {

    console.log(user , payload) ;

    return null ;
}

export const authServices = {
    loginUser ,
    changePasswordIntoDb ,
}
