
import { RequestHandler } from "express";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { academicFacultyServices } from "./academicFaculty.services";

const createAcademicFacultyIntoDb : RequestHandler = catchAsync( async (req , res , next) => { 
    const result = await academicFacultyServices.createAacademicFacultyIntoDb(req.body) ;
    sendResponse<object>(res , {success : true , message : "Academic faculty created success fully !" , statusCode : 200 , data : result }) ;
}) ;

const getAllAcademicFaculties : RequestHandler = catchAsync( async (req , res , next) => { 
    const result = await academicFacultyServices.getAllAcademicFacultiesFromDb() ;
    sendResponse<object[]>(res , {success : true , message : "Academic faculties retrive success fully !" , statusCode : 200 , data : result }) ;
}) ;

const getAcademicFaculty : RequestHandler = catchAsync( async (req , res , next) => { 
    const result = await academicFacultyServices.getSpecificAcademicFacultyFromDb(req.params.id) ;
    if(result){
        sendResponse<object>(res , {success : true , message : "Academic faculty retrive success fully !" , statusCode : 200 , data : result }) ;
    }
}) ;

const updateAcademicFaculty : RequestHandler = catchAsync( async (req , res , next) => { 
    const result = await academicFacultyServices.updateAcademicFacultyIntoDb(req.params.id , req.body) ;
    sendResponse<object>(res , {success : true , message : "Academic faculty updated success fully !" , statusCode : 200 , data : result }) ;
}) ;

export const academicFacultyControllers = {
    getAcademicFaculty ,
    updateAcademicFaculty ,
    getAllAcademicFaculties ,
    createAcademicFacultyIntoDb ,
}
