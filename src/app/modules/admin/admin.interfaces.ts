
import { Schema, Types } from "mongoose";

export type TAdminName = {
    firstName : string ;
    middleName : string ;
    lastName : string ;
}

export type TAdmin = {
    id : string ;
    user : Types.ObjectId ;
    designation : string ;
    name : TAdminName ;
    gender : "male" | "female" | "other";
    dateOfBirth : string ;
    email : string ;
    contactNo : string ;
    emergencyContactNo : string ;
    presentAddress : string ;
    permanentAddress : string ;
    profileImg : string ;
    isDeleted : boolean ;
}
