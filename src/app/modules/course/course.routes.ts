
import { Router } from "express";
import { courseControllers } from "./course.controllers";
import validateRequest from "../middlewares/validateRequest";
import { courseValidations } from "./course.validation";

const router = Router() ;

router.get("/" , courseControllers.getAllCourses) ;
router.get("/:id" , courseControllers.getSingleCourse) ;
router.delete("/:id" , courseControllers.deleteCourse) ;
router.post("/create-course" , validateRequest(courseValidations.createCourseValidation) , courseControllers.createCourse) ;

export const courseRoutes = router ;
