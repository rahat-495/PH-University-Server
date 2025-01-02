
import express from "express"
import { studentControllers } from "./student.controllers";
import validateRequest from "../middlewares/validateRequest";
import { studentValidations } from "./student.validation";

const router = express.Router() ;

router.get('/' , studentControllers.getAllStudents) ;
router.get('/:studentId' , studentControllers.getSpecificStudent) ;
router.patch('/:studentId' , validateRequest(studentValidations.updateStudentValidationSchema) , studentControllers.updateAStudent) ;
router.delete('/:studentId' , studentControllers.deleteAStudent) ;

export const studentRoutes = router ;
