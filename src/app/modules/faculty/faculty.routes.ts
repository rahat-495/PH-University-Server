
import express from "express"
import { facultyControllers } from "./faculty.controllers";
import validateRequest from "../middlewares/validateRequest";
import { facultyValidations } from "./faculty.validation";

const router = express.Router() ;

router.get('/' , facultyControllers.getAlFaculties) ;
router.get('/:facultyId' , facultyControllers.getSpecifiFaculty) ;
router.patch('/:facultyId' , validateRequest(facultyValidations.updateFacultyValidationSchema) , facultyControllers.updateFaculty) ;
router.delete('/:facultyId' , facultyControllers.deleteFaculty) ;

export const facultyRoutes = router ;
