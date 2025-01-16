
import { model, Schema } from "mongoose";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { semesterRegistrationStatus } from "./semesterRegistration.constant";
import AppError from "../../errors/AppErrors";
import academicSemestersModel from "../academicSemester/academicSemester.model";

const semesterRegistrationSchema = new Schema<TSemesterRegistration>({
    academicSemester : {
        type : Schema.Types.ObjectId ,
        ref : "academicSemester" ,
        required : true ,
        unique : true ,
    },
    status : {
        type : String ,
        default : "UPCOMING" ,
        enum : semesterRegistrationStatus ,
    },
    startDate : {
        type : Date ,
        required : true ,
    },
    endDate : {
        type : Date ,
        required : true ,
    },
    minCredit : {
        type : Number ,
        default : 3 ,
    },
    maxCredit : {
        type : Number ,
        default : 15 ,
    },
    isDeleted : {
        type : Boolean ,
        default : false ,
    }
},{
    timestamps : true ,
}) ;

semesterRegistrationSchema.pre("save" , async function(next){
    const payload = this ;
    const isAcademicSemesterAxist = await academicSemestersModel.findOne({ _id : payload.academicSemester}) ;
    if(!isAcademicSemesterAxist){
        throw new AppError(400 , "Academic Semester Ins't Axist !") ;
    }
    const isSemesterRegistrationAxist = await semesterRegistrationsModel.findOne({academicSemester : payload.academicSemester}) ;
    if(isSemesterRegistrationAxist){
        throw new AppError(400 , "Semester registration already axist !") ;
    }
    next() ;
})

export const semesterRegistrationsModel = model<TSemesterRegistration>("semesterRegistration" , semesterRegistrationSchema) ;
