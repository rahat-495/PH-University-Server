
import express from "express"
import { studentControllers } from "./student.controllers";

const router = express.Router() ;

router.get('/students' , studentControllers.getAllStudents) ;
router.get('/:id' , studentControllers.getSpecificStudent) ;
router.get('/:id' , studentControllers.deleteAStudent) ;

export const studentRoutes = router ;
