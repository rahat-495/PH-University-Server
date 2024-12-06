
import { model, Schema } from "mongoose";
import bcript from "bcryptjs";
import { TUser } from "./user.interfaces";
import config from "../../config";

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
        default : "in-progress" ,
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

userSchema.pre("save" , async function(next){
    const user = this ;
    user.password = await bcript.hash(user.password , Number(config.bcryptSaltRounds)) ;
    next() ;
})

userSchema.post("save" , async function(doc , next){
    doc.password = "" ;
    next() ;
})

userSchema.pre("find" , async function(next){
    this.find({isDeleted : { $ne : true }}) ;
    next() ;
})

userSchema.pre("findOne" , async function(next){
    this.find({isDeleted : { $ne : true }}) ;
    next() ;
})

export const UsersModel = model<TUser>('user' , userSchema) ;
