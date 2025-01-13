
import { Router } from "express";
import { offeredCourseControllers } from "./offeredCourse.controllers";
import validateRequest from "../middlewares/validateRequest";
import { offeredCourseValidations } from "./offeredCourse.validations";

const router = Router() ;

router.get('/' , offeredCourseControllers.getAllOfferdCourses) ;
router.post('/' , validateRequest(offeredCourseValidations.createOfferedCourseValidation) , offeredCourseControllers.createOfferedCourse) ;
router.patch('/:id' , offeredCourseControllers.updateOfferedCourse) ;
router.get('/:id' , offeredCourseControllers.getSingleOfferedCourse) ;

export const offeredCourseRoutes = router ;
