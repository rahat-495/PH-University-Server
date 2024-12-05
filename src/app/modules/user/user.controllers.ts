import { Request, Response } from "express";
import { userValidation } from "./user.validation";
import { userService } from "./user.services";

const createStudent = async (req : Request , res : Response) => {
    try {
        
        const {password , student : studentData} = req.body ;
        // const zodParsedData = userValidation.userValidationSchema.parse(studentData) ;
        const result = await userService.createStudnetIntoDb(password  , studentData) ;
        res.json({
            success : true ,
            message : "student created success fully !" ,
            data : result ,
        })

    } catch (error) {
        res.status(500).json({
            success : false ,
            message : "something went wrong !" ,
            error : error ,
        })
    }
}

export const userControllers = {
    createStudent ,
}
