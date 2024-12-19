
import { model, Schema } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";

const academicDepartmentSchema = new Schema<TAcademicDepartment>({
    name : {
        type : String ,
        unique : true ,
        required : [true , "Enter the name !"],
    },
    academicFaculty : {
        type : Schema.Types.ObjectId ,
        ref : "academicFaculty" ,
        required : [true , "Enter the academic faculty id !"],
    },
},{
    timestamps : true ,
})

academicDepartmentSchema.pre("save" , async function(next){
    const academicDepartment = await academicDepartmentsModel.findOne({name : this.name}) ;
    if(academicDepartment){
        throw new Error("Academic department name is already axist !") ; 
    }
    next() ;
}) ;

export const academicDepartmentsModel = model<TAcademicDepartment>("academicDepartment" , academicDepartmentSchema) ;
