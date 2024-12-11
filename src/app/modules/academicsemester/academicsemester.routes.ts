
import { Router } from "express";
import { academicSemesterControllers } from "./academicSemester.controllers";

const router = Router() ;

router.post('/create-academic-semester' , academicSemesterControllers.createAcademicSemester) ;

export const academicSemesterRoutes = router ;
