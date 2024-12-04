import { Request, Response } from "express";
import { userValidation } from "./user.validation";
import { userService } from "./user.services";

const createStudent = async (req : Request , res : Response) => {
    try {
        
        const data = req.body ;
        const zodParsedData = userValidation.userValidationSchema.parse(data) ;
        const result = await userService.createStudnetIntoDb(zodParsedData) ;

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
