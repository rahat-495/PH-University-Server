
import { model, Schema } from "mongoose";
import bcript from "bcryptjs";
import { TUser , UsersModelInterface } from "./user.interfaces";
import config from "../../config";
import AppError from "../../errors/AppErrors";
import bcrypt from "bcryptjs" ;

const userSchema = new Schema<TUser , UsersModelInterface>({
    id : {
        type : String ,
        unique : true ,
        required : true ,
    },
    email : {
        type : String ,
        unique : true ,
        required : true ,
    },
    password : {
        type : String ,
        required : true ,
        select : 0 ,
    },
    needsPasswordChange : {
        type : Boolean ,
        default : true ,
    },
    passwordChangeAt : {
        type : Date ,
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

userSchema.pre('findOneAndUpdate', async function(next) {
    const user = await UsersModel.findOne(this.getQuery()) ;
    if (!user) {
        throw new AppError(404, "User not found!");
    }
    next();
});

userSchema.statics.isUserAxistByCustomId = async function (id : string){
    const result = await UsersModel.findOne({id}).select("+password") ;
    return result ;
}

userSchema.statics.isPasswordMatched = async function (plainPass : string , hashedPass : string){
    return await bcrypt.compare(plainPass , hashedPass) ;
}

userSchema.statics.isJWTIssuedBeforePasswordChange = function(passwordChangeTimeStamp : Date , JWTIssuedTimeStamp : number){
    const passwordChangedTime = new Date(passwordChangeTimeStamp).getTime() / 1000 ;
    return passwordChangedTime > JWTIssuedTimeStamp ;
}

export const UsersModel = model<TUser , UsersModelInterface>('user' , userSchema) ;
