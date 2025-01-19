
import { Model } from "mongoose";

export interface TUser {
    id : string ;
    password : string ;
    needsPasswordChange : boolean ;
    role : "admin" | "student" | "faculty";
    status : "in-progress" | "blocked";
    isDeleted  : boolean;
} ;

export interface UsersModelInterface extends Model<TUser>{
    isUserAxistByCustomId(id : string) : Promise<TUser> ;
    isPasswordMatched(plainPass : string , hashedPass : string) : boolean ;
}
