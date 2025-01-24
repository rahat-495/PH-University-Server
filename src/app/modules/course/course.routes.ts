
import { Router } from "express";
import { courseControllers } from "./course.controllers";
import validateRequest from "../middlewares/validateRequest";
import { courseValidations } from "./course.validation";

const router = Router() ;

router.get("/" , courseControllers.getAllCourses) ;
router.get("/:id" , courseControllers.getSingleCourse) ;
router.delete("/:id" , courseControllers.deleteCourse) ;
router.patch("/:id" , validateRequest(courseValidations.updateCourseValidation) , courseControllers.updateCourse) ;
router.post("/create-course" , validateRequest(courseValidations.createCourseValidation) , courseControllers.createCourse) ;
router.put('/:courseId/assign-faculties' , validateRequest(courseValidations.facultiesWithCourseValidationSchema) , courseControllers.assignFacultiesWithCourse) ;
router.delete('/:courseId/remove-faculties' , validateRequest(courseValidations.facultiesWithCourseValidationSchema) , courseControllers.removeFacultiesWithCourse) ;

export const courseRoutes = router ;
