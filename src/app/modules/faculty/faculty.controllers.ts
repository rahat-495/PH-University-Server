
import { RequestHandler } from "express"
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";

const getAlFaculties : RequestHandler = catchAsync(async (req , res , next) => {
    const result = await studentServices.getAllStudentsFromDb(req.query) ;
    sendResponse<object>(res , {data : result , statusCode : 200 , success : true , message : "All students are retrived !"}) ;
}) ;

const getSpecifiFaculty : RequestHandler = catchAsync(async (req , res , next) => {
    const {id} = req.params ;
    const data = await studentServices.getSpecificStudentFromDb(id) ;
    if(data){
        sendResponse<object>(res , {data , statusCode : 200 , success : true , message : "Specific students are retrived !"}) ;
    }
}) ;

const updateFaculty : RequestHandler = catchAsync(async (req , res , next) => {
    const {id} = req.params ;
    const result = await studentServices.updateAStudentIntoDb(id , req.body.student) ;
    if(result){
        sendResponse<object>(res , {data : result , statusCode : 200 , success : true , message : "Student details udpated success fully !"}) ;
    }
}) ;

const deleteFaculty : RequestHandler = catchAsync(async (req , res , next) => {
    const {id} = req.params ;
    const result = await studentServices.deleteAStudentFromDb(id) ;
    if(result){
        sendResponse<object>(res , {data : result , statusCode : 200 , success : true , message : "Specific students are deleted !"}) ;
    }
}) ;

export const facultyControllers = {
    getAlFaculties,
    deleteFaculty ,
    updateFaculty ,
    getSpecifiFaculty ,
}
