
import { model, Schema } from "mongoose";
import { TAcademicSemester } from "./academicSemester.interface";
import { academicSemesterCode, academicSemesterName, months } from "./academicSemester.constant";

const academicSemesterSchema = new Schema<TAcademicSemester>({
    name : {
        type : String ,
        required : true ,
        enum : academicSemesterName ,
    },
    year : {
        type : Date ,
        required : true ,
    },
    code : {
        type : String ,
        required : true ,
        enum : academicSemesterCode ,
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
