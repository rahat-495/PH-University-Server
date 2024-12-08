
import { RequestHandler } from "express"
import { studentServices } from "./student.services";
import sendResponse from "../../utils/sendResponse";

const getAllStudents : RequestHandler = async (req , res , next) => {
    try {
        const result = await studentServices.getAllStudentsFromDb() ;
        sendResponse<object>(res , {data : result , statusCode : 200 , success : true , message : "All students are retrived !"}) ;
    } catch (error) {
        next(error) ;
    }
}

export const studentControllers = {
    getAllStudents ,
}
