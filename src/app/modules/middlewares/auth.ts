
import { NextFunction, Request, Response } from "express"
import catchAsync from "../../utils/catchAsync";
import AppError from "../../errors/AppErrors";
import httpStatus from "http-status-codes";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";

const auth = () => {
    return catchAsync(async (req : Request , res : Response , next : NextFunction) => {
        const token = req.headers.authorization ;
        
        if(!token){
            throw new AppError(httpStatus.UNAUTHORIZED , "You are not authorized !") ;
        }
        
        jwt.verify(token as string , config.jwtAccessSecret as string , function(err , decoded){
            
            if(err){
                throw new AppError(httpStatus.UNAUTHORIZED , "You are not authorized !") ;
            }

            req.user = decoded as JwtPayload ;
            
        })

        next() ;
    })
}

export default auth ;
