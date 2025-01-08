
import { Router } from "express";
import { semesterRegistrationControllers } from "./semesterRegistration.controllers";

const router = Router() ;

router.get('/' , semesterRegistrationControllers.getAllSemesterRegistration) ;
router.patch('/:id' , semesterRegistrationControllers.updateSemesterRegistration) ;
router.get('/:id' , semesterRegistrationControllers.getSingleSemesterRegistration) ;
router.post('/create-semester-registration' , semesterRegistrationControllers.createSemesterRegistration) ;

export const semesterRegistrationRoutes = router ;
