
import { RequestHandler } from "express";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { academicSemesterServices } from "./academicSemester.services";

const createAcademicSemester : RequestHandler = catchAsync( async (req , res , next) => { 
    const {data} = req.body ;
    const result = await academicSemesterServices.createacademicSemesterIntoDb(data) ;
    if(!result){
        return ;
    }
    sendResponse<object>(res , {success : true ,
    message : "Academic semester created success fully !" , 
    statusCode : 200 , data : result }) ;
}) ;

export const academicSemesterControllers = {
    createAcademicSemester ,
}
