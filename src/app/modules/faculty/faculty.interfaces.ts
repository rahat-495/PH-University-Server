
import { Schema, Types } from "mongoose";

export type TFacultyName = {
    firstName : string ;
    middleName : string ;
    lastName : string ;
}

export type TFaculty = {
    id : string ;
    user : Types.ObjectId ;
    designation : string ;
    name : TFacultyName ;
    gender : "male" | "female" | "other";
    dateOfBirth : string ;
    email : string ;
    contactNo : string ;
    emergencyContactNo : string ;
    presentAddress : string ;
    permanentAddress : string ;
    profileImg : string ;
    academicFaculty : Schema.Types.ObjectId ;
    academicDepartment : Schema.Types.ObjectId ;
    isDeleted : boolean ;
}
