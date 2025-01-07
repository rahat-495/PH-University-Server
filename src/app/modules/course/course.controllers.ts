
import { RequestHandler } from "express";
import { courseServices } from "./course.services";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";

const createCourse : RequestHandler = catchAsync(async (req , res) => {
    const result = await courseServices.createCourseIntoDb(req.body) ;
    if(result){
        sendResponse<object>(res , {data : result , statusCode : 200 , success : true , message : "Course Created Successfully !"}) ;
    }
})

const getAllCourses : RequestHandler = catchAsync(async (req , res) => {
    const result = await courseServices.getAllCourseFromDb(req.query) ;
    if(result){
        sendResponse<object>(res , {data : result , statusCode : 200 , success : true , message : "All courses are retrive Successfully !"}) ;
    }
})

const getSingleCourse : RequestHandler = catchAsync(async (req , res) => {
    const result = await courseServices.getSingleCourseFromDb(req.params.id) ;
    if(result){
        sendResponse<object>(res , {data : result , statusCode : 200 , success : true , message : "Course are retrive Successfully !"}) ;
    }
})

const updateCourse : RequestHandler = catchAsync(async (req , res) => {
    const result = await courseServices.updateCourseIntoDb(req.params.id , req.body) ;
    if(result){
        sendResponse<object>(res , {data : result , statusCode : 200 , success : true , message : "Course are updated Successfully !"}) ;
    }
})

const deleteCourse : RequestHandler = catchAsync(async (req , res) => {
    const result = await courseServices.deleteCourseIntoDb(req.params.id) ;
    if(result){
        sendResponse<object>(res , {data : result , statusCode : 200 , success : true , message : "Course are deleted Successfully !"}) ;
    }
})

const assignFaculties : RequestHandler = catchAsync(async (req , res) => {
    const result = await courseServices.deleteCourseIntoDb(req.params.id) ;
    if(result){
        sendResponse<object>(res , {data : result , statusCode : 200 , success : true , message : "Course are deleted Successfully !"}) ;
    }
})

export const courseControllers = {
    deleteCourse,
    updateCourse, 
    createCourse ,
    getAllCourses ,
    assignFaculties,
    getSingleCourse ,
}
