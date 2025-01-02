
import { RequestHandler } from "express"
import { studentServices } from "./student.services";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";

const getAllStudents : RequestHandler = catchAsync(async (req , res , next) => {
    const result = await studentServices.getAllStudentsFromDb(req.query) ;
    sendResponse<object>(res , {data : result , statusCode : 200 , success : true , message : "All students are retrived !"}) ;
}) ;

const getSpecificStudent : RequestHandler = catchAsync(async (req , res , next) => {
    const {studentId} = req.params ;
    const data = await studentServices.getSpecificStudentFromDb(studentId) ;
    if(data){
        sendResponse<object>(res , {data , statusCode : 200 , success : true , message : "Specific students are retrived !"}) ;
    }
    else{
        sendResponse<object>(res , {data : {} , statusCode : 200 , success : true , message : "Can't Get Any student !"}) ;
    }
}) ;

const updateAStudent : RequestHandler = catchAsync(async (req , res , next) => {
    const {studentId} = req.params ;
    const result = await studentServices.updateAStudentIntoDb(studentId , req.body.student) ;
    if(result){
        sendResponse<object>(res , {data : result , statusCode : 200 , success : true , message : "Student details udpated success fully !"}) ;
    }
}) ;

const deleteAStudent : RequestHandler = catchAsync(async (req , res , next) => {
    const {studentId} = req.params ;
    const result = await studentServices.deleteAStudentFromDb(studentId) ;
    if(result){
        sendResponse<object>(res , {data : result , statusCode : 200 , success : true , message : "Specific students are deleted !"}) ;
    }
}) ;

export const studentControllers = {
    getAllStudents,
    deleteAStudent ,
    updateAStudent ,
    getSpecificStudent ,
}
