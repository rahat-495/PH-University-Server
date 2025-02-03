
import express from "express"
import { userControllers } from "./user.controllers";
import validateRequest from "../middlewares/validateRequest";
import { studentValidations } from "../student/student.validation";
import { facultyValidations } from "../faculty/faculty.validation";
import { adminValidations } from "../admin/admin.validation";
import auth from "../middlewares/auth";
import { userRole } from "./user.constant";

const router = express.Router() ;

router.post('/create-student' , auth(userRole.admin) , validateRequest(studentValidations.createStudentValidationSchema) , userControllers.createStudent) ;
router.post('/create-faculty' , auth(userRole.admin) , validateRequest(facultyValidations.createFacultyValidationSchema) , userControllers.createFaculty) ;    
router.post('/create-admin' , validateRequest(adminValidations.createAdminValidationSchema) , userControllers.createAdmin) ;

export const userRoutes = router ;
