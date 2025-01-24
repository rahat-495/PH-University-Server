
import { Router } from "express";
import { academicSemesterControllers } from "./academicSemester.controllers";
import validateRequest from "../middlewares/validateRequest";
import { academicSemesterValidations } from "./academicSemester.validation";

const router = Router() ;

router.post('/create-academic-semester' , validateRequest(academicSemesterValidations.createAcademicSemesterValidationSchema) , academicSemesterControllers.createAcademicSemester) ;
router.get('/get-all-academic-semester' , academicSemesterControllers.getAllAcademicSemester) ;
router.get('/get-academic-semester/:semesterId' , academicSemesterControllers.getAcademicSemester) ;
router.patch('/update-academic-semester/:semesterId' , validateRequest(academicSemesterValidations.updateAcademicSemesterValidationSchema) , academicSemesterControllers.updateAcademicSemester) ;

export const academicSemesterRoutes = router ;
