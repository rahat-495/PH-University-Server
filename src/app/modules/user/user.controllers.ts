
import { RequestHandler } from "express";
import { userService } from "./user.services";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";

const createStudent : RequestHandler = catchAsync( async (req , res , next) => { 
    const {password , student : studentData} = req.body ;
    const result = await userService.createStudnetIntoDb(password  , studentData) ;
    if(!result){
        return ;
    }
    sendResponse<object>(res , {success : true ,
    message : "student created success fully !" , 
    statusCode : 200 , data : result }) ;
}) ;

const createFaculty : RequestHandler = catchAsync( async (req , res , next) => { 
    const {password , faculty} = req.body ;
    const result = await userService.createFacultyIntoDb(password  , faculty) ;
    if(!result){
        return ;
    }
    sendResponse<object>(res , {success : true ,
    message : "Faculty created success fully !" , 
    statusCode : 200 , data : result }) ;
}) ;

const createAdmin : RequestHandler = catchAsync( async (req , res , next) => { 
    const {password , admin} = req.body ;
    const result = await userService.createAdminIntoDb(password  , admin) ;
    if(!result){
        return ;
    }
    sendResponse<object>(res , {success : true ,
    message : "Admin created success fully !" , 
    statusCode : 200 , data : result }) ;
}) ;

export const userControllers = {
    createAdmin ,
    createStudent ,
    createFaculty ,
}
