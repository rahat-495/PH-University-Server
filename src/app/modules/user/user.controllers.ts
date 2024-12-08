
import { NextFunction, RequestHandler, Response , Request } from "express";
import { userService } from "./user.services";
import sendResponse from "../../utils/sendResponse";
import { TStudent } from "../student/student.interfaces";

const catchAsync = (fn : RequestHandler) => {
    return (req : Request , res : Response , next : NextFunction) => {
        Promise.resolve(fn(req , res , next)).catch((err) => next(err)) ;
    }
} 

const createStudent : RequestHandler = catchAsync( async (req , res , next) => { 
    const {password , student : studentData} = req.body ;
    // const zodParsedData = userValidation.userValidationSchema.parse(studentData) ;
    const result = await userService.createStudnetIntoDb(password  , studentData) ;
    if(!result){
        return ;
    }
    sendResponse<TStudent>(res , {success : true ,
    message : "student created success fully !" , 
    statusCode : 200 , data : result }) ;
}) ;

export const userControllers = {
    createStudent ,
}
