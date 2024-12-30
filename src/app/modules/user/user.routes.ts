
import express from "express"
import { userControllers } from "./user.controllers";
import validateRequest from "../middlewares/validateRequest";
import { studentValidations } from "../student/student.validation";
import { facultyValidations } from "../faculty/faculty.validation";

const router = express.Router() ;

router.post('/create-student' , validateRequest(studentValidations.createStudentValidationSchema) , userControllers.createStudent) ;
router.post('/create-faculty' , validateRequest(facultyValidations.createFacultyValidationSchema) , userControllers.createFaculty) ;    

export const userRoutes = router ;
