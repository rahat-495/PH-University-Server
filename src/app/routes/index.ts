
import express from "express"
import { studentRoutes } from "../modules/student/student.routes";
import { userRoutes } from "../modules/user/user.routes";

const router = express.Router() ;

const moduleRoutes = [
    {
        path : '/users' ,
        route : userRoutes ,
    } ,
    {
        path : '/students' ,
        route : studentRoutes ,
    } ,
]

moduleRoutes.forEach((route) => router.use(route.path , route.route)) ;

export default router ;
