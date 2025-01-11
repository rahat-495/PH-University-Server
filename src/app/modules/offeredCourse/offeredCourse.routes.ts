
import { Router } from "express";
import { offeredCourseControllers } from "./offeredCourse.controllers";

const router = Router() ;

router.get('/' , offeredCourseControllers.getAllOfferdCourses) ;
router.post('/' , offeredCourseControllers.createOfferedCourse) ;
router.patch('/:id' , offeredCourseControllers.updateOfferedCourse) ;
router.get('/:id' , offeredCourseControllers.getSingleOfferedCourse) ;

export const offeredCourseRoutes = router ;
