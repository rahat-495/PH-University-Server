
import jwt from "jsonwebtoken";

export const createToken = async (jwtPayload : {userId : string , role : string} , secret : string , expiresIn : string) => {
    return jwt.sign( jwtPayload , secret , { expiresIn } ) ;
}
