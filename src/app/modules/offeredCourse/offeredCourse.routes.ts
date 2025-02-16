
import { Router } from "express";
import { offeredCourseControllers } from "./offeredCourse.controllers";
import validateRequest from "../middlewares/validateRequest";
import { offeredCourseValidations } from "./offeredCourse.validations";
import auth from "../middlewares/auth";
import { userRole } from "../user/user.constant";

const router = Router() ;

router.get('/' , offeredCourseControllers.getAllOfferdCourses) ;
router.get('/my-offered-courses' , auth(userRole.student) , offeredCourseControllers.getMyOfferedCourses) ;
router.get('/:id' , offeredCourseControllers.getSingleOfferedCourse) ;
router.delete('/:id' , offeredCourseControllers.deleteOfferedCourse) ;
router.patch('/:id' , validateRequest(offeredCourseValidations.updateOfferedCourseValidation) , offeredCourseControllers.updateOfferedCourse) ;
router.post('/create-offered-course' , validateRequest(offeredCourseValidations.createOfferedCourseValidation) , offeredCourseControllers.createOfferedCourse) ;

export const offeredCourseRoutes = router ;
