
import express, { NextFunction, Request, Response } from "express"
import { userControllers } from "./user.controllers";
import { AnyZodObject } from "zod";
import { studentValidationSchema } from "../student/student.validation";

const router = express.Router() ;

const validateRequest = (schema : AnyZodObject) => {
    return async (req : Request , res : Response , next : NextFunction) => {
        try {
            await schema.parseAsync({body : req.body});
            return next() ;
        } catch (error) {
            next(error) ;
        }
    }
}

router.post('/create-student' , validateRequest(studentValidationSchema) , userControllers.createStudent) ;

export const userRoutes = router ;
