
import { model, Schema } from "mongoose";
import { TAcademicSemester, TAcademicSemesterCode, TAcademicSemesterName } from "./academicSemester.interface";

const months = ["January" , "February" , "March" , "April" , "May" , "June" , "July" , "August" , "September" , "October" , "November" , "December"]
const academicSemesterName : TAcademicSemesterName[] = ["Autumn" , "Summer" , "Fall"] ;
const academicSemesterCode : TAcademicSemesterCode[] = ["01" , "02" , "03"] ;

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
