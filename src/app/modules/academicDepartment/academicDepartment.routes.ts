
import { Router } from "express";
import validateRequest from "../middlewares/validateRequest";
import { academicDepartmentControllers } from "./academicDepartment.controllers";
import { academicDepartmentValidations } from "./academicDepartment.validation";

const router = Router() ;

router.get('/:id', academicDepartmentControllers.getAcademicDepartment) ;
router.get('/', academicDepartmentControllers.getAllAcademicDepartment) ;
router.patch('/:id' , validateRequest(academicDepartmentValidations.updateAcademicDepartmentValidationSchema) , academicDepartmentControllers.updateAcademicDepartment) ;
router.post('/create-academic-department' , validateRequest(academicDepartmentValidations.createAcademicDepartmentValidationSchema) , academicDepartmentControllers.createAcademicDepartmentIntoDb) ;

export const academicDepartmentRoutes = router ;
