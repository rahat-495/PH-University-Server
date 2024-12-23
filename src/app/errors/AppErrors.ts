
export class AppError extends Error {

    constructor(public statusCode : number , message : string , stack = ""){
        super(message) ;
        this.statusCode = this.statusCode ;
        if(stack){
            this.stack = stack ;
        }else{
            Error.captureStackTrace(this , this.constructor) ; 
        }
    }
}
