
import express from "express"
import { studentControllers } from "./student.controllers";

const router = express.Router() ;

router.get('/students' , studentControllers.getAllStudents) ;
router.get('/student/:id' , studentControllers.getSpecificStudent) ;

export const studentRoutes = router ;
