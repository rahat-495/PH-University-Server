
import { RequestHandler } from "express";
import { userService } from "./user.services";
import sendResponse from "../../utils/sendResponse";
import { TStudent } from "../student/student.interfaces";

const createStudent : RequestHandler = async (req , res , next) => {
    try {
        
        const {password , student : studentData} = req.body ;
        // const zodParsedData = userValidation.userValidationSchema.parse(studentData) ;
        const result = await userService.createStudnetIntoDb(password  , studentData) ;
        if(!result){
            return ;
        }
        sendResponse<TStudent>(res , {success : true ,
        message : "student created success fully !" , 
        statusCode : 200 , data : result }) ;

    } catch (error) {
        next(error) ;
    }
}

export const userControllers = {
    createStudent ,
}
