
import { model, Schema } from "mongoose";
import { TEnrolledCourseMarks, TEnrolledCourse } from "./enrolledCourse.interfaces";
import { grade } from "./enrolledCourse.constand";

const courseMarksSchema = new Schema<TEnrolledCourseMarks>({
    classTest1 : {
        type : Number ,
        min : 0 ,
        max : 10 ,
        default : 0 ,
    },
    midTerm : {
        type : Number ,
        min : 0 ,
        max : 30 ,
        default : 0 ,
    },
    classTest2 : {
        type : Number ,
        min : 0 ,
        max : 10 ,
        default : 0 ,
    },
    finelTerm : {
        type : Number ,
        min : 0 ,
        max : 50 ,
        default : 0 ,
    },
})

const enrolledCourseSchema = new Schema<TEnrolledCourse>({
    academicDepartment : {
        type : Schema.Types.ObjectId ,
        required : true ,
        ref : "academicDepartment" ,
    },
    offeredCourse : {
        type : Schema.Types.ObjectId ,
        required : true ,
        ref : "offeredCourse" ,
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
    student : {
        type : Schema.Types.ObjectId ,
        required : true ,
        ref : "student" ,
    },
    courseMarks : {
        type : courseMarksSchema ,
        default : {} ,
    },
    isCompleted : {
        type : Boolean ,
        default : false ,
    },
    isEnrolled : {
        type : Boolean ,
        default : false ,
    },
    grade : {
        type : String ,
        enum : grade ,
        default : "NA" ,
    },
    gradePoints : {
        type : Number ,
        min : 0 ,
        max : 4 ,
        default : 0 ,
    },
},{
    timestamps : true ,
})

export const enrolledCoursesModel = model<TEnrolledCourse>("enrolledCourse" , enrolledCourseSchema) ;
