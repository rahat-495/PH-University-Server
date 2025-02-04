
import express, { NextFunction, Request, Response } from "express"
import { userControllers } from "./user.controllers";
import validateRequest from "../middlewares/validateRequest";
import { studentValidations } from "../student/student.validation";
import { facultyValidations } from "../faculty/faculty.validation";
import { adminValidations } from "../admin/admin.validation";
import auth from "../middlewares/auth";
import { userRole } from "./user.constant";
import { userValidation } from "./user.validation";
import { upload } from "../../utils/sendImageToCloudinary";
import { parseTextDataToJsonData } from "./user.utils";

const router = express.Router() ;

router.get('/me' , auth('student' , 'faculty' , 'admin') , userControllers.getMe) ;
router.post('/change-status/:id' , auth('admin') , validateRequest(userValidation.changeStatusValidationSchema) , userControllers.changeStatus) ;

router.post('/create-admin' , 
    upload.single("file") ,
    parseTextDataToJsonData ,
    validateRequest(adminValidations.createAdminValidationSchema) , 
    userControllers.createAdmin
);

router.post('/create-student' , 
    upload.single("file") ,
    parseTextDataToJsonData ,
    validateRequest(studentValidations.createStudentValidationSchema) ,
    auth('admin') , 
    userControllers.createStudent
);

router.post('/create-faculty' , 
    upload.single("file") ,
    parseTextDataToJsonData ,
    auth('admin') , 
    validateRequest(facultyValidations.createFacultyValidationSchema) , 
    userControllers.createFaculty
);    

export const userRoutes = router ;
