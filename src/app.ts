
import express, { response } from "express" ;
import cors from "cors" ;
import { studentRoutes } from "./app/modules/student/student.routes";
import { userRoutes } from "./app/modules/user/user.routes";
import { NextFunction, Request, Response } from "express";
const app = express() ;

app.use(cors()) ;
app.use(express.json()) ;

app.use('/api/v1/users' , userRoutes) ;
app.use('/api/v1/students' , studentRoutes) ;

app.get('/' , async (req , res) => {
    res.json({message : "The second project server are running !" , success : true}) ;
})

app.use((err : any , req : Request , res : Response , next : NextFunction) : any => {
    return res.status(500).json({
        success : false ,
        message : err.message || "some thing wen't wrong" ,
        error : err ,
    })
})

export default app ;
