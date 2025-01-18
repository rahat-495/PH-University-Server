
import { Router } from "express";
import { semesterRegistrationControllers } from "./semesterRegistration.controllers";
import validateRequest from "../middlewares/validateRequest";
import { semesterRegistrationValidations } from "./semesterRegistration.validation";

const router = Router() ;

router.get('/' , semesterRegistrationControllers.getAllSemesterRegistration) ;
router.get('/:id' , semesterRegistrationControllers.getSingleSemesterRegistration) ;
router.delete('/:id' , semesterRegistrationControllers.deleteSemesterRegistration) ;
router.patch('/:id' , validateRequest(semesterRegistrationValidations.updateSemesterRegistrationValidationSchema) , semesterRegistrationControllers.updateSemesterRegistration) ;
router.post('/create-semester-registration' , validateRequest(semesterRegistrationValidations.createSemesterRegistrationValidationSchema) , semesterRegistrationControllers.createSemesterRegistration) ;

export const semesterRegistrationRoutes = router ;
