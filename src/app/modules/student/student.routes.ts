
import express from "express"
import { studentControllers } from "./student.controllers";

const router = express.Router() ;

router.get('/getAllStudents' , studentControllers.getAllStudents) ;

export const studentRoutes = router ;
