
export class AppError extends Error {

    constructor(message : string , public statusCode : number , stack = ""){
        super(message) ;
        this.statusCode = this.statusCode ;
        if(stack){
            this.stack = stack ;
        }else{
            Error.captureStackTrace(this , this.constructor) ; 
        }
    }
}
