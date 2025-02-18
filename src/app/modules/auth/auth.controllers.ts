
import config from "../../config";
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse";
import { authServices } from "./auth.services";

const loginUser = catchAsync(async (req , res) => {
    const result = await authServices.loginUser(req.body) ;
    res.cookie("refreshToken" , result.refreshtoken , { secure : config.nodeEnv === "production" , httpOnly : true , sameSite : "none" , maxAge : 1000 * 60 * 60 * 24 * 365}) ;
    if(result){
        sendResponse<object>(res , {data : result , statusCode : 200 , success : true , message : "User Login Successfully !"}) ;
    }
})

const changePassword = catchAsync(async (req , res) => {
    const result = await authServices.changePasswordIntoDb(req.user , req.body) ;
    if(result){
        sendResponse
        <object>(res , {data : result , statusCode : 200 , success : true , message : "User password change Successfully !"}) ;
    }
})

const refreshToken = catchAsync(async (req , res) => {
    const result = await authServices.refreshToken(req.cookies.refreshToken) ;
    if(result){
        sendResponse
        <object>(res , {data : result , statusCode : 200 , success : true , message : "Access token retribed Successfully !"}) ;
    }
})

const forgetPassword = catchAsync(async (req , res) => {
    const result = await authServices.forgetPassword(req.body.id) ;
    res.status(200).json({
        success : true , message : "Reset link is generated Successfully !"
    })
})

const resetPassword = catchAsync(async (req , res) => {
    const result = await authServices.resetPassword(req.body , req.headers.authorization as string) ;
    if(result){
        sendResponse
        <object>(res , {data : result , statusCode : 200 , success : true , message : "Password Reset Successfully !"}) ;
    }
})

export const authControllers = {
    loginUser ,
    refreshToken ,
    resetPassword ,
    changePassword ,
    forgetPassword ,
}
