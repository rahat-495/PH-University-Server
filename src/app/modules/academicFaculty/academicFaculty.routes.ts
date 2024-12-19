
import { Router } from "express";
import validateRequest from "../middlewares/validateRequest";
import { academicFacultyValidation } from "./academicFaculty.validation";
import { academicFacultyControllers } from "./academicFaculty.controllers";

const router = Router() ;

router.get('/:id', academicFacultyControllers.getAcademicFaculty) ;
router.get('/', academicFacultyControllers.getAllAcademicFaculties) ;
router.patch('/:id' , validateRequest(academicFacultyValidation.academicFacultyValidationSchema) , academicFacultyControllers.updateAcademicFaculty) ;
router.post('/create-academic-faculty' , validateRequest(academicFacultyValidation.academicFacultyValidationSchema) , academicFacultyControllers.createAcademicFacultyIntoDb) ;

export const academicFacultyRoutes = router ;
