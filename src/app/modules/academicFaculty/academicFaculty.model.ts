
import { model, Schema } from "mongoose";
import { TAcademicFaculty } from "./academicFaculty.interfaces";

const academicFacultySchema = new Schema<TAcademicFaculty>({
    name : {
        type : String ,
        unique : true ,
        required : [true , "Enter the name !"],
    }
},{
    timestamps : true ,
})

export const academicFacultysModel = model<TAcademicFaculty>("academicFaculty" , academicFacultySchema) ;
