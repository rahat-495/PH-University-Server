
import { model, Schema } from "mongoose";
import { TAcademicSemester } from "./academicSemester.interface";

const months = ["January" , "February" , "March" , "April" , "May" , "June" , "July" , "August" , "September" , "October" , "November" , "December"]

const academicSemesterSchema = new Schema<TAcademicSemester>({
    name : {
        type : String ,
        required : true ,
    },
    year : {
        type : Date ,
        required : true ,
    },
    code : {
        type : String ,
        required : true ,
    },
    startMonth : {
        enum : months ,
        type : String ,
        required : true ,
    },
    endMonth : {
        enum : months ,
        type : String ,
        required : true ,
    },
} , {
    timestamps : true ,
})

const academicSemestersModel = model<TAcademicSemester>("academicSemester" , academicSemesterSchema) ;
export default academicSemestersModel ;
