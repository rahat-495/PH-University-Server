
import { RequestHandler } from "express";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { academicSemesterServices } from "./academicSemester.services";

const createAcademicSemester : RequestHandler = catchAsync( async (req , res , next) => { 
    const result = await academicSemesterServices.createacademicSemesterIntoDb(req.body) ;
    sendResponse<object>(res , {success : true ,
    message : "Academic semester created success fully !" , 
    statusCode : 200 , data : result }) ;
}) ;

export const academicSemesterControllers = {
    createAcademicSemester ,
}
