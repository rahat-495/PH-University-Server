
import { model, Schema } from "mongoose";
import { TOfferedCourse } from "./offeredCourse.interface";
import { Days } from "./offeredCourse.constants";

const offeredCourseSchema = new Schema<TOfferedCourse>({
    academicDepartment : {
        type : Schema.Types.ObjectId ,
        required : true ,
        ref : "academicDepartment" ,
    },
    academicFaculty : {
        type : Schema.Types.ObjectId ,
        required : true ,
        ref : "academicFaculty" ,
    },
    academicSemester : {
        type : Schema.Types.ObjectId ,
        required : true ,
        ref : "academicSemester" ,
    },
    semesterRegistration : {
        type : Schema.Types.ObjectId ,
        required : true ,
        ref : "semesterRegistration" ,
    },
    course : {
        type : Schema.Types.ObjectId ,
        required : true ,
        ref : "course" ,
    },
    faculty : {
        type : Schema.Types.ObjectId ,
        required : true ,
        ref : "faculty" ,
    },
    maxCapacity : {
        type : Number ,
        default : 10 ,
        required : true ,
    },
    section : {
        type : Number ,
        required : true ,
    },
    days : {
        type : String ,
        required : true ,
        enum : Days ,
    },
    startTime : {
        type : String ,
        required : true ,
    },
    endTime : {
        type : String ,
        required : true ,
    },
});

export const offeredCoursesModel = model<TOfferedCourse>("offeredCourse" , offeredCourseSchema) ;
