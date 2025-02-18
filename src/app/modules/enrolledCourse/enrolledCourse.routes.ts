
import { Router } from "express";
import validateRequest from "../middlewares/validateRequest";
import { enrolledCourseValidations } from "./enrolledCourse.validations";
import { enrolledCourseControllers } from "./enrolledCourse.controllers";
import auth from "../middlewares/auth";

const router = Router() ;

router.get('/my-enrolled-courses' , auth("student") , enrolledCourseControllers.getMyEnrolledCourses) ;
router.post('/create-enrolled-course' , auth("student") , validateRequest(enrolledCourseValidations.createEnrolledCourseValidationSchema) , enrolledCourseControllers.createEnrolledCourse) ;
router.post('/update-enrolled-course-marks' , auth("faculty") , validateRequest(enrolledCourseValidations.updateEnrolledCourseMarksValidationSchema) , enrolledCourseControllers.updateEnrolledCourseMarks) ;

export const enrolledCourseRoutes = router ;
