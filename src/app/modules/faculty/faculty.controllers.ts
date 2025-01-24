
import { RequestHandler } from "express"
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { facultyServices } from "./faculty.services";

const getAlFaculties : RequestHandler = catchAsync(async (req , res , next) => {
    const result = await facultyServices.getAllFacultiesFromDb(req.query) ;
    sendResponse<object>(res , {data : result , statusCode : 200 , success : true , message : "All faculties are retrived !"}) ;
}) ;

const getSpecifiFaculty : RequestHandler = catchAsync(async (req , res , next) => {
    const {id} = req.params ;
    const data = await facultyServices.getSpecificFacultyFromDb(id) ;
    if(data){
        sendResponse<object>(res , {data , statusCode : 200 , success : true , message : "Specific faculties are retrived !"}) ;
    }
    else{
        sendResponse<object>(res , {data : {} , statusCode : 200 , success : true , message : "Can't Get Any Faculty !"}) ;
    }
}) ;

const updateFaculty : RequestHandler = catchAsync(async (req , res , next) => {
    const {id} = req.params ;
    const result = await facultyServices.updateAFacultyIntoDb(id , req.body.faculty) ;
    if(result){
        sendResponse<object>(res , {data : result , statusCode : 200 , success : true , message : "Faculty details udpated success fully !"}) ;
    }
}) ;

const deleteFaculty : RequestHandler = catchAsync(async (req , res , next) => {
    const {id} = req.params ;
    const result = await facultyServices.deleteAFacultyFromDb(id) ;
    if(result){
        sendResponse<object>(res , {data : result , statusCode : 200 , success : true , message : "Specific faculties are deleted !"}) ;
    }
}) ;

export const facultyControllers = {
    getAlFaculties,
    deleteFaculty ,
    updateFaculty ,
    getSpecifiFaculty ,
}
