
import { NextFunction, Request, Response } from "express";

const globalErrorHandler = (err : any , req : Request , res : Response , next : NextFunction) : any => {
    return res.status(500).json({
        success : false ,
        message : err.message || "some thing wen't wrong" ,
        error : err ,
    })
}

export default globalErrorHandler ;
