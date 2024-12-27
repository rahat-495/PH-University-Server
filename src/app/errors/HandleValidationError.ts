
import mongoose from "mongoose";
import { TErrorSources } from "../interface/error";

const handleValidationError = (err : mongoose.Error.ValidationError) => {
    const statusCode = 400 ;
    const errorSources : TErrorSources = Object.values(err.errors).map((value : mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
        return {path : value.path , message : value.message} ;
    }) ;   
    return {
        statusCode ,
        message : "Validation error" ,
        errorSources ,
    }
}

export default handleValidationError;
