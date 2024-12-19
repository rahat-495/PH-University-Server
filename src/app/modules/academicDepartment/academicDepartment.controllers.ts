
import { RequestHandler } from "express";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { academicDepartmentServices } from "./academicDepartment.services";

const createAcademicDepartmentIntoDb : RequestHandler = catchAsync( async (req , res , next) => { 
    const result = await academicDepartmentServices.createAacademicDepartmentIntoDb(req.body) ;
    sendResponse<object>(res , {success : true , message : "Academic department created success fully !" , statusCode : 200 , data : result }) ;
}) ;

const getAllAcademicDepartment : RequestHandler = catchAsync( async (req , res , next) => { 
    const result = await academicDepartmentServices.getAllAcademicDepartmentFromDb() ;
    sendResponse<object[]>(res , {success : true , message : "Academic department retrive success fully !" , statusCode : 200 , data : result }) ;
}) ;

const getAcademicDepartment : RequestHandler = catchAsync( async (req , res , next) => { 
    const result = await academicDepartmentServices.getSpecificAcademicDepartmentFromDb(req.params.id) ;
    if(result){
        sendResponse<object>(res , {success : true , message : "Academic department retrive success fully !" , statusCode : 200 , data : result }) ;
    }
}) ;

const updateAcademicDepartment : RequestHandler = catchAsync( async (req , res , next) => { 
    const result = await academicDepartmentServices.updateAcademicDepartmentIntoDb(req.params.id , req.body) ;
    sendResponse<object>(res , {success : true , message : "Academic department updated success fully !" , statusCode : 200 , data : result }) ;
}) ;

export const academicDepartmentControllers = {
    getAcademicDepartment ,
    updateAcademicDepartment ,
    getAllAcademicDepartment ,
    createAcademicDepartmentIntoDb ,
}
