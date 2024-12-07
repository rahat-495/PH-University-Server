
import express from "express" ;
import cors from "cors" ;
import { studentRoutes } from "./app/modules/student/student.routes";
import { userRoutes } from "./app/modules/user/user.routes";
import globalErrorHandler from "./app/modules/middlewares/globalErrorHandler";
import notFound from "./app/modules/middlewares/notFound";
import router from "./app/routes";
const app = express() ;

app.use(cors()) ;
app.use(express.json()) ;

app.use('/api/v1' , router) ;

app.get('/' , async (req , res) => {
    res.json({message : "The second project server are running !" , success : true}) ;
})

app.use(notFound) ;
app.use(globalErrorHandler) ;

export default app ;
