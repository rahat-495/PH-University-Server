
import { Router } from "express";
import { academicSemesterControllers } from "./academicSemester.controllers";
import validateRequest from "../middlewares/validateRequest";
import { academicSemesterValidations } from "./academicSemester.validation";

const router = Router() ;

router.post('/create-academic-semester' , validateRequest(academicSemesterValidations.createAcademicSemesterValidationSchema) , academicSemesterControllers.createAcademicSemester) ;
router.get('/get-all-academic-semester' , academicSemesterControllers.getAllAcademicSemester) ;

export const academicSemesterRoutes = router ;
