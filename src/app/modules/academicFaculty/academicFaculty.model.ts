
import { model, Schema } from "mongoose";
import { TAcademicFaculty } from "./academicFaculty.interfaces";

const academicFacultySchema = new Schema<TAcademicFaculty>({
    name : {
        type : String ,
        required : [true , "Enter the name !"]
    }
})

export const academicFacultysModel = model("academicFaculty" , academicFacultySchema) ;
