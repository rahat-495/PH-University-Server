
import config from "../../config";
import AppError from "../../errors/AppErrors";
import { UsersModel } from "../user/user.model";
import { TLoginUser, TPasswordData } from "./auth.interface"
import jwt, { JwtPayload } from "jsonwebtoken" ;
import bcrypt from "bcryptjs" ;

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

const changePasswordIntoDb = async (userData : JwtPayload , payload : TPasswordData) => {

    const user = await UsersModel.isUserAxistByCustomId(userData?.userId) ;
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
    
    if(!await UsersModel.isPasswordMatched(payload?.oldPassword , user?.password)){
        throw new AppError(400 , "The password is not matched !") ;
    }

    const newHashedPassword = await bcrypt.hash(payload?.newPassword , Number(config.bcryptSaltRounds)) ;
    const result = await UsersModel.findOneAndUpdate({id : user?.id , role : userData?.role} , {password : newHashedPassword , needsPasswordChange :false , passwordChangeAt : new Date()} , {new : true}) ;
    return result ;
}

export const authServices = {
    loginUser ,
    changePasswordIntoDb ,
}
