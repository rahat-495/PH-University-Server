
import config from "../../config";
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse";
import { authServices } from "./auth.services";

const loginUser = catchAsync(async (req , res) => {
    const result = await authServices.loginUser(req.body) ;
    res.cookie("refreshToken" , result.refreshtoken , { secure : config.nodeEnv === "production" , httpOnly : true}) ;
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

export const authControllers = {
    loginUser ,
    refreshToken ,
    changePassword ,
}
