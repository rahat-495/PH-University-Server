
import { Router } from "express";
import { academicSemesterControllers } from "./academicSemester.controllers";
import validateRequest from "../middlewares/validateRequest";
import { academicSemesterValidations } from "./academicSemester.validation";

const router = Router() ;

router.post('/create-academic-semester' , validateRequest(academicSemesterValidations.createAcademicSemesterValidationSchema) , academicSemesterControllers.createAcademicSemester) ;

export const academicSemesterRoutes = router ;
