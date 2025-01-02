
import { Types } from "mongoose"

export type TPreRequisiteCourse = {
    course : Types.ObjectId ;
    isDeleter : boolean ;
}

export type TCourse = {
    title : string ;
    prefix : string ;
    code : number ;
    credits : number ;
    preRequisiteCourses : TPreRequisiteCourse[] ;
}
