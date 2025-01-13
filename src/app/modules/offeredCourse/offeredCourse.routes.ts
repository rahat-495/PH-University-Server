
import { Router } from "express";
import { offeredCourseControllers } from "./offeredCourse.controllers";
import validateRequest from "../middlewares/validateRequest";
import { offeredCourseValidations } from "./offeredCourse.validations";

const router = Router() ;

router.get('/' , offeredCourseControllers.getAllOfferdCourses) ;
router.patch('/:id' , offeredCourseControllers.updateOfferedCourse) ;
router.get('/:id' , offeredCourseControllers.getSingleOfferedCourse) ;
router.post('/create-offered-course' , validateRequest(offeredCourseValidations.createOfferedCourseValidation) , offeredCourseControllers.createOfferedCourse) ;

export const offeredCourseRoutes = router ;
