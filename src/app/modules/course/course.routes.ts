
import { Router } from "express";
import { courseControllers } from "./course.controllers";

const router = Router() ;

router.post("/create" , courseControllers.createCourse) ;

export const courseRoutes = router ;
