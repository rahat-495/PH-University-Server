
import express from "express" ;
import cors from "cors" ;
import { studentRoutes } from "./app/modules/student/student.routes";
import { userRoutes } from "./app/modules/user/user.routes";
const app = express() ;

app.use(cors()) ;
app.use(express.json()) ;

app.use('/api/v1/users' , userRoutes) ;
app.use('/api/v1/students' , studentRoutes) ;

app.get('/' , async (req , res) => {
    res.json({message : "The second project server are running !" , success : true}) ;
})

export default app ;
