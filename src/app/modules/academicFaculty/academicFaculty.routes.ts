
import { Router } from "express";
import validateRequest from "../middlewares/validateRequest";
import { academicFacultyValidations } from "./academicFaculty.validation";
import { academicFacultyControllers } from "./academicFaculty.controllers";
import auth from "../middlewares/auth";
import { userRole } from "../user/user.constant";

const router = Router() ;

router.get('/:id', academicFacultyControllers.getAcademicFaculty) ;
router.get('/', academicFacultyControllers.getAllAcademicFaculties) ;
router.patch('/:id' , validateRequest(academicFacultyValidations.academicFacultyValidationSchema) , academicFacultyControllers.updateAcademicFaculty) ;
router.post('/create-academic-faculty' , auth(userRole.superAdmin , userRole.admin) , validateRequest(academicFacultyValidations.academicFacultyValidationSchema) , academicFacultyControllers.createAcademicFacultyIntoDb) ;

export const academicFacultyRoutes = router ;
