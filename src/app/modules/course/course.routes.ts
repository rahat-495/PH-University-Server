
import { Router } from "express";
import { courseControllers } from "./course.controllers";
import validateRequest from "../middlewares/validateRequest";
import { courseValidations } from "./course.validation";

const router = Router() ;

router.post("/create-course" , validateRequest(courseValidations.createCourseValidation) , courseControllers.createCourse) ;
router.get("/" , courseControllers.getAllCourses) ;

export const courseRoutes = router ;
