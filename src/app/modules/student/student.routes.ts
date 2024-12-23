
import express from "express"
import { studentControllers } from "./student.controllers";

const router = express.Router() ;

router.get('/' , studentControllers.getAllStudents) ;
router.get('/:id' , studentControllers.getSpecificStudent) ;
router.delete('/:id' , studentControllers.deleteAStudent) ;

export const studentRoutes = router ;
