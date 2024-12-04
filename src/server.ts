
import mongoose from "mongoose";
import app from "./app"
import config from "./app/config";

const main = async () => {

    try {

        await mongoose.connect(config.databaseUrl as string) ;
    
        app.listen(config.port , () => {
            console.log(`server are running at port ${config.port} !`) ;
        })
        
    } catch (error) {
        console.log(error)   
    }

}

main() ;
