
import { model, Schema } from "mongoose";
import { TCourse, TCourseFaculties, TPreRequisiteCourse } from "./course.interfaces";

const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourse>({
    course : { type : Schema.Types.ObjectId , ref : "course" } ,
    isDeleted : { type : Boolean , default : false } ,
})

const courseSchema = new Schema<TCourse>({
    title : {
        trim : true ,
        type : String ,
        unique : true ,
        required : [true , "Title is required !"] ,
    },
    prefix : {
        trim : true ,
        type : String ,
        required : [true , "prefix is required !"] ,
    },
    code : {
        trim : true ,
        type : Number ,
        required : [true , "code is required !"] ,
    },
    credits : {
        trim : true ,
        type : Number ,
        required : [true , "credits is required !"] ,
    },
    preRequisiteCourses : [preRequisiteCoursesSchema] ,
    isDeleted : { 
        type : Boolean , 
        default : false ,
    } ,
})

const courseFacultiesSchema = new Schema<TCourseFaculties>({
    course : {
        type : Schema.Types.ObjectId ,
        required : true ,
        ref : "course" ,
        unique : true ,
    },
    faculties : [{
        type : Schema.Types.ObjectId ,
        ref : "faculty"
    }]
})

export const coursesModel = model<TCourse>("course" , courseSchema) ;
export const courseFacultiesModel = model<TCourseFaculties>("courseFaculty" , courseFacultiesSchema) ;
