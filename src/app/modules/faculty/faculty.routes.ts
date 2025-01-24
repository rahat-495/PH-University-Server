
import express from "express"
import { facultyControllers } from "./faculty.controllers";
import validateRequest from "../middlewares/validateRequest";
import { facultyValidations } from "./faculty.validation";
import auth from "../middlewares/auth";

const router = express.Router() ;

router.get('/' , auth() , facultyControllers.getAlFaculties) ;
router.get('/:id' , facultyControllers.getSpecifiFaculty) ;
router.patch('/:id' , validateRequest(facultyValidations.updateFacultyValidationSchema) , facultyControllers.updateFaculty) ;
router.delete('/:id' , facultyControllers.deleteFaculty) ;

export const facultyRoutes = router ;
