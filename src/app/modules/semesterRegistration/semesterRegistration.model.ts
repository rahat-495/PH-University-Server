
import { model, Schema } from "mongoose";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { semesterRegistrationStatus } from "./semesterRegistration.constant";

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
},{
    timestamps : true ,
}) ;

export const semesterRegistrationsModel = model<TSemesterRegistration>("semesterRegistration" , semesterRegistrationSchema) ;
