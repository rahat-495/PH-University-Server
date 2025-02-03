
import express from "express"
import { studentControllers } from "./student.controllers";
import validateRequest from "../middlewares/validateRequest";
import { studentValidations } from "./student.validation";
import auth from "../middlewares/auth";
import { userRole } from "../user/user.constant";

const router = express.Router() ;

router.get('/' , studentControllers.getAllStudents) ;
router.get('/:id' , auth(userRole.admin , userRole.faculty) , studentControllers.getSpecificStudent) ;
router.patch('/:id' , validateRequest(studentValidations.updateStudentValidationSchema) , studentControllers.updateAStudent) ;
router.delete('/:id' , studentControllers.deleteAStudent) ;

export const studentRoutes = router ;
