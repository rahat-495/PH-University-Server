
import { RequestHandler } from "express";
import { userService } from "./user.services";
import sendResponse from "../../utils/sendResponse";
import { TStudent } from "../student/student.interfaces";
import catchAsync from "../../utils/catchAsync";

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
