
import config from "../../config";
import sendResponse from "../../utils/sendResponse";
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import academicSemestersModel from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interfaces";
import { studentsModel } from "../student/student.model";
import { TUser } from "./user.interfaces";
import { UsersModel } from "./user.model";
import { generateStudentId } from "./user.utils";

const createStudnetIntoDb = async (password : string , studentData : Partial<TStudent>) => {

    const userData : Partial<TUser> = {} ;
    userData.role = 'student' ;

    const academicDetails = await academicSemestersModel.findById(studentData.admissionSemester) ;

    if(!academicDetails){
        return false ;
    }

    userData.id = await generateStudentId(academicDetails as TAcademicSemester) ;
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
