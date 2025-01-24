
import express from "express"
import { studentControllers } from "./student.controllers";
import validateRequest from "../middlewares/validateRequest";
import { studentValidations } from "./student.validation";

const router = express.Router() ;

router.get('/' , studentControllers.getAllStudents) ;
router.get('/:id' , studentControllers.getSpecificStudent) ;
router.patch('/:id' , validateRequest(studentValidations.updateStudentValidationSchema) , studentControllers.updateAStudent) ;
router.delete('/:id' , studentControllers.deleteAStudent) ;

export const studentRoutes = router ;
