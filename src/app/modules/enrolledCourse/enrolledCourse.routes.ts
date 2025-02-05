
import { Router } from "express";
import validateRequest from "../middlewares/validateRequest";
import { enrolledCourseValidations } from "./enrolledCourse.validations";
import { enrolledCourseControllers } from "./enrolledCourse.controllers";

const router = Router() ;

router.post('/create-enrolled-course' , validateRequest(enrolledCourseValidations.createEnrolledCourseValidationSchema) , enrolledCourseControllers.createEnrolledCourse) ;

export const enrolledCourseRoutes = router ;
