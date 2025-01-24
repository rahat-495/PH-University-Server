
import { Response } from "express";

type TResponse<T> = {
    data : T ;
    success : boolean;
    message ?: string ;
    statusCode : number ;
}

const sendResponse = <T>(res : Response , payload : TResponse<T>) => {
    res.status(payload?.statusCode).json({
        success : payload?.success ,
        message : payload?.message ,
        data : payload?.data ,
    })
}

export default sendResponse ;
