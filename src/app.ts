
import express from "express" ;
import cors from "cors" ;
const app = express() ;

app.use(cors()) ;
app.use(express.json()) ;

app.get('/' , async (req , res) => {
    res.json({message : "The second project server are running !" , success : true}) ;
})

export default app ;
