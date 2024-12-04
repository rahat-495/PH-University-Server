
import { model, Schema } from "mongoose";
import { TUser } from "./user.interfaces";

const userSchema = new Schema<TUser>({
    id : {
        type : String ,
        required : true ,
    },
    password : {
        type : String ,
        required : true ,
    },
    needsPasswordChange : {
        type : Boolean ,
        default : true ,
    },
    status : {
        type : String ,
        required : true ,
        enum : ["in-progress" , "blocked"],
    },
    role : {
        type : String ,
        required : true ,
        enum : ["admin" , "student" , "faculty"],
    },
    isDeleted : {
        type : Boolean ,
        default : false ,
    },
} , {
    timestamps : true ,
})

export const UsersModel = model<TUser>('user' , userSchema) ;
