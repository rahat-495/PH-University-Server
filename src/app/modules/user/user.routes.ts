
import express from "express"
import { userControllers } from "./user.controllers";
import { studentValidationSchema } from "../student/student.validation";
import validateRequest from "../middlewares/validateRequest";

const router = express.Router() ;

router.post('/create-student' , validateRequest(studentValidationSchema) , userControllers.createStudent) ;

export const userRoutes = router ;
