
import { model, Schema } from "mongoose";
import { TCourseMarks, TEnrolledCourse } from "./enrolledCourse.interfaces";
import { grade } from "./enrolledCourse.constand";

const courseMarksSchema = new Schema<TCourseMarks>({
    classTest1 : {
        type : Number ,
        default : 0 ,
    },
    midTerm : {
        type : Number ,
        default : 0 ,
    },
    classTest2 : {
        type : Number ,
        default : 0 ,
    },
    finelTerm : {
        type : Number ,
        default : 0 ,
    },
})

const enrolledCourseSchema = new Schema<TEnrolledCourse>({
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
    student : {
        type : Schema.Types.ObjectId ,
        required : true ,
        ref : "student" ,
    },
    courseMarks : {
        type : courseMarksSchema ,
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
