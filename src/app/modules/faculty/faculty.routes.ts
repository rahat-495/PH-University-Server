
import express from "express"
import { facultyControllers } from "./faculty.controllers";
import validateRequest from "../middlewares/validateRequest";
import { facultyValidations } from "./faculty.validation";
import auth from "../middlewares/auth";
import { userRole } from "../user/user.constant";

const router = express.Router() ;

router.delete('/:id' , facultyControllers.deleteFaculty) ;
router.get('/:id' , facultyControllers.getSpecifiFaculty) ;
router.get('/' , auth(userRole.admin , userRole.faculty) , facultyControllers.getAlFaculties) ;
router.patch('/:id' , validateRequest(facultyValidations.updateFacultyValidationSchema) , facultyControllers.updateFaculty) ;

export const facultyRoutes = router ;
