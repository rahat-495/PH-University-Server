
import { Schema, Types } from "mongoose";

export type TUserName = {
    firstName : string ;
    middleName : string ;
    lastName : string ;
}

export type TGuardian = {
    fatherName : string ;
    fatherOccupation : string ;
    fatherContactNo : string ;
    motherName : string ;
    motherContactNo : string ;
    motherOccupation : string ;
}

export type TLocalGuardian = {
    name : string ;
    occupation : string ;
    contactNo : string ;
    address : string ;
}

export type TStudent = {
    id : string ;
    user : Types.ObjectId ;
    name : TUserName ;
    gender : "male" | "female" | "other";
    dateOfBirth : string ;
    email : string ;
    contactNo : string ;
    emergencyContactNo : string ;
    presentAddress : string ;
    permanentAddress : string ;
    guardian : TGuardian ;
    localGuardian : TLocalGuardian ;
    profileImg : string ;
    admissionSemester : Schema.Types.ObjectId ;
    academicDepartment : Schema.Types.ObjectId ;
    isDeleted : boolean ;
}
