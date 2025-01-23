
import { Model } from "mongoose";
import { userRole } from "./user.constant";

export interface TUser {
    id : string ;
    password : string ;
    needsPasswordChange : boolean ;
    passwordChangeAt : Date ;
    role : "admin" | "student" | "faculty";
    status : "in-progress" | "blocked";
    isDeleted  : boolean;
} ;

export interface UsersModelInterface extends Model<TUser>{
    isUserAxistByCustomId(id : string) : Promise<TUser> ;
    isPasswordMatched(plainPass : string , hashedPass : string) : boolean ;
}

export type TUserRole = keyof typeof userRole ;
