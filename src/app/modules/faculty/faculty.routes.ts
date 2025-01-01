
import express from "express"
import { facultyControllers } from "./faculty.controllers";

const router = express.Router() ;

router.get('/' , facultyControllers.getAlFaculties) ;
router.get('/:id' , facultyControllers.getSpecifiFaculty) ;
router.patch('/:id' , facultyControllers.updateFaculty) ;
router.delete('/:id' , facultyControllers.deleteFaculty) ;

export const facultyRoutes = router ;
