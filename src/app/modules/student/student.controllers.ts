
import { NextFunction, Request, RequestHandler, Response } from "express"
import { studentServices } from "./student.services";
import sendResponse from "../../utils/sendResponse";

const catchAsync = (fn : RequestHandler) => {
    return (req : Request , res : Response , next : NextFunction) => {
        Promise.resolve(fn(req , res , next)).catch((err) => next(err)) ;
    }
} 

const getAllStudents : RequestHandler = catchAsync(async (req , res , next) => {
    const result = await studentServices.getAllStudentsFromDb() ;
    sendResponse<object>(res , {data : result , statusCode : 200 , success : true , message : "All students are retrived !"}) ;
}) ;

export const studentControllers = {
    getAllStudents ,
}
