
import { RequestHandler } from "express";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { semesterRegistrationServices } from "./semesterRegistration.services";

const createSemesterRegistration : RequestHandler = catchAsync(async (req , res) => {
    const result = await semesterRegistrationServices.createSemesterRegistrationIntoDb(req.body) ;
    if(result){
        sendResponse<object>(res , {data : result , statusCode : 200 , success : true , message : "Semester Registration Created Successfully !"}) ;
    }
})

const getAllSemesterRegistration : RequestHandler = catchAsync(async (req , res) => {
    const result = await semesterRegistrationServices.getAllSemesterRegistrationFromDb(req.query) ;
    if(result){
        sendResponse<object>(res , {data : result , statusCode : 200 , success : true , message : "All Semester Registration are retrive Successfully !"}) ;
    }
})

const getSingleSemesterRegistration : RequestHandler = catchAsync(async (req , res) => {
    const result = await semesterRegistrationServices.getSingleSemesterRegistrationFromDb(req.params.id) ;
    if(result){
        sendResponse<object>(res , {data : result , statusCode : 200 , success : true , message : "Semester Registration are retrive Successfully !"}) ;
    }
})

const updateSemesterRegistration : RequestHandler = catchAsync(async (req , res) => {
    const result = await semesterRegistrationServices.updateSemesterRegistrationIntoDb(req.params.id , req.body) ;
    if(result){
        sendResponse<object>(res , {data : result , statusCode : 200 , success : true , message : "Semester Registration are updated Successfully !"}) ;
    }
})

const deleteSemesterRegistration : RequestHandler = catchAsync(async (req , res) => {
    const result = await semesterRegistrationServices.deleteSemesterRegistrationFromDb(req.params.id) ;
    if(result){
        sendResponse<object>(res , {data : result , statusCode : 200 , success : true , message : "Semester Registration are deleted Successfully !"}) ;
    }
})

export const semesterRegistrationControllers = {
    updateSemesterRegistration , 
    createSemesterRegistration ,
    getAllSemesterRegistration ,
    deleteSemesterRegistration ,
    getSingleSemesterRegistration ,
}
