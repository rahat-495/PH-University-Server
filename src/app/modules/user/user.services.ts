
import config from "../../config";
import { TStudent } from "../student/student.interfaces";
import { studentsModel } from "../student/student.model";
import { TUser } from "./user.interfaces";
import { UsersModel } from "./user.model";

const createStudnetIntoDb = async (password : string , studentData : Partial<TStudent>) => {

    const userData : Partial<TUser> = {} ;
    userData.role = 'student' ;
    userData.id = "2030100001" ;
    userData.password = password || config.defaultPass as string ;

    const newUser = await UsersModel.create(userData) ;
    if(newUser?._id){
        studentData.id = newUser?.id ;
        studentData.user = newUser?._id ;
        const newStudent = await studentsModel.create(studentData) ;
        return newStudent ;
    }
}

export const userService = {
    createStudnetIntoDb ,
}
