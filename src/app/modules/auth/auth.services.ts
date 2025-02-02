
import config from "../../config";
import AppError from "../../errors/AppErrors";
import { UsersModel } from "../user/user.model";
import { TLoginUser, TPasswordData } from "./auth.interface"
import jwt, { JwtPayload } from "jsonwebtoken" ;
import bcrypt from "bcryptjs" ;
import httpStatus from "http-status" ;
import { createToken } from "./auth.utils";
import { sendEmail } from "../../utils/sendEmail";

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
    
    if(! await UsersModel.isPasswordMatched(payload?.password , user?.password)){
        throw new AppError(400 , "The password is not matched !") ;
    }

    const jwtPayload = { userId : user?.id , role : user?.role }
    const accesstoken = await createToken(jwtPayload , config.jwtAccessSecret as string , "1d") ;
    const refreshtoken = await createToken(jwtPayload , config.jwtRefreshSecret as string , "365d") ;

    return { accesstoken , refreshtoken , needsPasswordChange : user?.needsPasswordChange } ;
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

const refreshToken = async (token : string) => {

    const decoded = jwt.verify(token as string , config.jwtRefreshSecret as string) as JwtPayload ;
    const user = await UsersModel.isUserAxistByCustomId(decoded?.userId) ;
    
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
    
    if(user?.passwordChangeAt && UsersModel.isJWTIssuedBeforePasswordChange(user?.passwordChangeAt , decoded.iat as number)){
        throw new AppError(httpStatus.UNAUTHORIZED , "You are not authorized !") ;
    }

    const jwtPayload = { userId : user?.id , role : user?.role }
    const accessToken = await createToken(jwtPayload , config.jwtAccessSecret as string , "1d") ;
    return {accessToken} ;
}

const forgetPassword = async (userId : string) => {
    const user = await UsersModel.isUserAxistByCustomId(userId) ;
    
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

    const jwtPayload = { userId : user?.id , role : user?.role }
    const resetToken = await createToken(jwtPayload , config.jwtAccessSecret as string , "10m") ;
    const resetUiLink = `${config.resetPassUILink}?id=${user?.id}&token=${resetToken}` ;
    sendEmail(user?.email , resetUiLink) ;
}

const resetPassword = async (payload : {id : string , newPassword : string} , token : string) => {
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

    const decoded = await jwt.verify(token , config.jwtAccessSecret as string) as JwtPayload ;
    if(payload?.id !== decoded?.userId){
        throw new AppError(httpStatus.FORBIDDEN , "You are forbidden !") ;
    }

    const newHashedPassword = await bcrypt.hash(payload?.newPassword , Number(config.bcryptSaltRounds)) ;
    const result = await UsersModel.findOneAndUpdate({id : decoded?.userId , role : decoded?.role} , {password : newHashedPassword , needsPasswordChange :false , passwordChangeAt : new Date()} , {new : true}) ;
    return result ;
}

export const authServices = {
    loginUser ,
    refreshToken ,
    resetPassword ,
    forgetPassword ,
    changePasswordIntoDb ,
}
