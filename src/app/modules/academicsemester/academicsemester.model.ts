
import { Error, model, Schema } from "mongoose";
import { TAcademicSemester } from "./academicSemester.interface";
import { academicSemesterCode, academicSemesterName, months } from "./academicSemester.constant";

const academicSemesterSchema = new Schema<TAcademicSemester>({
    name : {
        type : String ,
        required : true ,
        enum : academicSemesterName ,
    },
    year : {
        type : String ,
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

academicSemesterSchema.pre("save" , async function(next){
    const isSemesterAxist = await academicSemestersModel.findOne({name : this.name , year : this.year}) ;
    if(isSemesterAxist){
        throw new Error("Semester already axist !") ;
    }
    next() ;
})

const academicSemestersModel = model<TAcademicSemester>("academicSemester" , academicSemesterSchema) ;
export default academicSemestersModel ;
