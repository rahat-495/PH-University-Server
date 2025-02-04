
import dotenv from "dotenv" ;
import path from "path" ;

dotenv.config({path : path.join(process.cwd() , ".env")}) ;

export default {
    port : process.env.PORT,
    databaseUrl : process.env.DATABASE_URL,
    defaultPass : process.env.DEFAULT_PASS,
    bcryptSaltRounds : process.env.BCRYPT_SALT_ROUNDS,
    nodeEnv : process.env.NODE_ENV,
    jwtAccessSecret : process.env.JWT_ACCESS_SECRET,
    jwtRefreshSecret : process.env.JWT_Refresh_SECRET,
    resetPassUILink : process.env.RESET_PASS_UI_LINK,
    cloudName : process.env.CLOUD_NAME,
    apiKey : process.env.API_KEY,
    apiSecret : process.env.API_SECRET,
}
