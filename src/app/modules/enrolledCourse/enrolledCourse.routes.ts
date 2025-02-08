
import { Router } from "express";
import validateRequest from "../middlewares/validateRequest";
import { enrolledCourseValidations } from "./enrolledCourse.validations";
import { enrolledCourseControllers } from "./enrolledCourse.controllers";
import auth from "../middlewares/auth";

const router = Router() ;

router.post('/create-enrolled-course' , auth("student") , validateRequest(enrolledCourseValidations.createEnrolledCourseValidationSchema) , enrolledCourseControllers.createEnrolledCourse) ;

export const enrolledCourseRoutes = router ;
