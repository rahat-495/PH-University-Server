
import { Schema } from "mongoose";

export type TFacultyName = {
    firstName : string ;
    middleName : string ;
    lastName : string ;
}

export type TFaculty = {
    id : string ;
    user : Schema.Types.ObjectId ;
    designation : string ;
    name : TFacultyName ;
    gender : "male" | "female" | "other";
    dateOfBirth : string ;
    email : string ;
    contactNo : string ;
    emergencyContactNo : string ;
    presentAddress : string ;
    permanentAddress : string ;
    profileImage : string ;
    academicFaculty : Schema.Types.ObjectId ;
    academicDepartment : Schema.Types.ObjectId ;
    isDeleted : boolean ;
}
