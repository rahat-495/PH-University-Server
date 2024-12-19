
import express from "express"
import { studentRoutes } from "../modules/student/student.routes";
import { userRoutes } from "../modules/user/user.routes";
import { academicSemesterRoutes } from "../modules/academicSemester/academicSemester.routes";
import { academicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.routes";

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
    {
        path : '/academic-semesters' ,
        route : academicSemesterRoutes ,
    } ,
    {
        path : '/faculties' ,
        route : academicFacultyRoutes ,
    } ,
]

moduleRoutes.forEach((route) => router.use(route.path , route.route)) ;

export default router ;
