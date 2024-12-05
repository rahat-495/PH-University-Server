
import { Types } from "mongoose";

type TUserName = {
    fristName : string ;
    middleName : string ;
    lastName : string ;
}

type TGuardian = {
    fatherName : string ;
    fatherOccupation : string ;
    fatherContactNo : string ;
    motherName : string ;
    motherContactNo : string ;
    motherOccupation : string ;
}

type TLocalGuardian = {
    name : string ;
    accupation : string ;
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
    profileImage : string ;
    admissionSemester : string ;
    isDeleted : boolean ;
}
