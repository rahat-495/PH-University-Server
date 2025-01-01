
import express from "express"
import { userControllers } from "./user.controllers";
import validateRequest from "../middlewares/validateRequest";
import { studentValidations } from "../student/student.validation";
import { facultyValidations } from "../faculty/faculty.validation";
import { adminValidations } from "../admin/admin.validation";

const router = express.Router() ;

router.post('/create-student' , validateRequest(studentValidations.createStudentValidationSchema) , userControllers.createStudent) ;
router.post('/create-faculty' , validateRequest(facultyValidations.createFacultyValidationSchema) , userControllers.createFaculty) ;    
router.post('/create-admin' , validateRequest(adminValidations.createAdminValidationSchema) , userControllers.createAdmin) ;    

export const userRoutes = router ;
