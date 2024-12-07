
import express from "express"
import { studentRoutes } from "../modules/student/student.routes";
import { userRoutes } from "../modules/user/user.routes";

const router = express.Router() ;

router.use('/users' , userRoutes) ;
router.use('/students' , studentRoutes) ;

export default router ;
