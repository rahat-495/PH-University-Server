
import e, { ErrorRequestHandler, NextFunction } from "express";
import { ZodError } from "zod";
import { TErrorSources } from "../../interface/error";
import config from "../../config";
import handleZodError from "../../errors/HandleZodError";
import handleValidationError from "../../errors/HandleValidationError";

const globalErrorHandler : ErrorRequestHandler = (err , req , res , next : NextFunction) : any => {

    let statusCode = err.statusCode || 500 ;
    let message = err.message || "some thing wen't wrong" ;
    let errorSources : TErrorSources = [{ path : "" , message : "Some thing went wrong" }] ;

    if(err instanceof ZodError){
        const simplifiedError = handleZodError(err) ;
        statusCode = simplifiedError.statusCode ;
        message = simplifiedError.message ;
        errorSources = simplifiedError.errorSources ;
    }
    else if(err.name === "ValidationError"){
        const simplifiedError = handleValidationError(err) ;
        statusCode = simplifiedError.statusCode ;
        message = simplifiedError.message ;
        errorSources = simplifiedError.errorSources ;    
    }

    return res.status(statusCode).json({
        success : false ,
        message ,
        errorSources ,
        stack : config.nodeEnv === "development" ? err.stack : null ,
    })
}

export default globalErrorHandler ;
