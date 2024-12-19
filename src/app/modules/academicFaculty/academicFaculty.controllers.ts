
import { RequestHandler } from "express";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { academicFacultyServices } from "./academicFaculty.services";

const createAcademicFacultyIntoDb : RequestHandler = catchAsync( async (req , res , next) => { 
    const result = await academicFacultyServices.createAacademicFacultyIntoDb(req.body) ;
    sendResponse<object>(res , {success : true , message : "Academic semester created success fully !" , statusCode : 200 , data : result }) ;
}) ;

const getAllAcademicFaculties : RequestHandler = catchAsync( async (req , res , next) => { 
    const result = await academicFacultyServices.getAllAcademicFacultiesFromDb() ;
    sendResponse<object[]>(res , {success : true , message : "Academic semesters retrive success fully !" , statusCode : 200 , data : result }) ;
}) ;

const getAcademicFaculty : RequestHandler = catchAsync( async (req , res , next) => { 
    const result = await academicFacultyServices.getSpecificAcademicFacultyFromDb(req.params.semesterId) ;
    if(result){
        sendResponse<object>(res , {success : true , message : "Academic semester retrive success fully !" , statusCode : 200 , data : result }) ;
    }
}) ;

const updateAcademicFaculty : RequestHandler = catchAsync( async (req , res , next) => { 
    const result = await academicFacultyServices.updateAcademicFacultyIntoDb(req.params.semesterId , req.body) ;
    sendResponse<object>(res , {success : true , message : "Academic semester updated success fully !" , statusCode : 200 , data : result }) ;
}) ;

export const academicSemesterControllers = {
    getAcademicFaculty ,
    updateAcademicFaculty ,
    getAllAcademicFaculties ,
    createAcademicFacultyIntoDb ,
}
