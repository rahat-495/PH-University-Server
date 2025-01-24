
import { RequestHandler } from "express";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { academicSemesterServices } from "./academicsemester.services";

const createAcademicSemester : RequestHandler = catchAsync( async (req , res , next) => { 
    const result = await academicSemesterServices.createacademicSemesterIntoDb(req.body) ;
    sendResponse<object>(res , {success : true , message : "Academic semester created success fully !" , statusCode : 200 , data : result }) ;
}) ;

const getAllAcademicSemester : RequestHandler = catchAsync( async (req , res , next) => { 
    const result = await academicSemesterServices.getAllAcademicSemesterFromDb() ;
    sendResponse<object[]>(res , {success : true , message : "Academic semesters retrive success fully !" , statusCode : 200 , data : result }) ;
}) ;

const getAcademicSemester : RequestHandler = catchAsync( async (req , res , next) => { 
    const result = await academicSemesterServices.getAcademicSemesterFromDb(req.params.semesterId) ;
    if(result){
        sendResponse<object>(res , {success : true , message : "Academic semester retrive success fully !" , statusCode : 200 , data : result }) ;
    }
}) ;

const updateAcademicSemester : RequestHandler = catchAsync( async (req , res , next) => { 
    const result = await academicSemesterServices.updateAcademicSemesterIntoDb(req.params.semesterId , req.body) ;
    sendResponse<object>(res , {success : true , message : "Academic semester updated success fully !" , statusCode : 200 , data : result }) ;
}) ;

export const academicSemesterControllers = {
    getAcademicSemester ,
    createAcademicSemester ,
    getAllAcademicSemester ,
    updateAcademicSemester ,
}
