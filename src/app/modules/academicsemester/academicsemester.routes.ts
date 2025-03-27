
import { Router } from "express";
import validateRequest from "../middlewares/validateRequest";
import { academicSemesterControllers } from "./academicsemester.controllers";
import { academicSemesterValidations } from "./academicSemester.validation";
import auth from "../middlewares/auth";

const router = Router() ;

router.post('/create-academic-semester' , validateRequest(academicSemesterValidations.createAcademicSemesterValidationSchema) , academicSemesterControllers.createAcademicSemester) ;
router.get('/get-all-academic-semester' , auth('admin') , academicSemesterControllers.getAllAcademicSemester) ;
router.get('/get-academic-semester/:semesterId' , academicSemesterControllers.getAcademicSemester) ;
router.patch('/update-academic-semester/:semesterId' , validateRequest(academicSemesterValidations.updateAcademicSemesterValidationSchema) , academicSemesterControllers.updateAcademicSemester) ;

export const academicSemesterRoutes = router ;
