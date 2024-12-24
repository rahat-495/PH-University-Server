
import { RequestHandler } from "express"
import { studentServices } from "./student.services";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { TStudent } from "./student.interfaces";

const getAllStudents : RequestHandler = catchAsync(async (req , res , next) => {
    const result = await studentServices.getAllStudentsFromDb() ;
    sendResponse<object>(res , {data : result , statusCode : 200 , success : true , message : "All students are retrived !"}) ;
}) ;

const getSpecificStudent : RequestHandler = catchAsync(async (req , res , next) => {
    const {id} = req.params ;
    const data = await studentServices.getSpecificStudentFromDb(id) ;
    if(data){
        sendResponse<object>(res , {data , statusCode : 200 , success : true , message : "Specific students are retrived !"}) ;
    }
}) ;

const updateAStudent : RequestHandler = catchAsync(async (req , res , next) => {
    const {id} = req.params ;
    const result = await studentServices.updateAStudentIntoDb(id , req.body.student) ;
    if(result){
        sendResponse<object>(res , {data : result , statusCode : 200 , success : true , message : "Student details udpated success fully !"}) ;
    }
}) ;

const deleteAStudent : RequestHandler = catchAsync(async (req , res , next) => {
    const {id} = req.params ;
    const result = await studentServices.deleteAStudentFromDb(id) ;
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
