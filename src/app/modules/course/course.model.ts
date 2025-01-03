
import { model, Schema } from "mongoose";
import { TCourse, TPreRequisiteCourse } from "./course.interfaces";

const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourse>({
    course : { type : Schema.Types.ObjectId , ref : "course" } ,
    isDeleter : { type : Boolean , default : false } ,
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
})

export const coursesModel = model<TCourse>("course" , courseSchema) ;
