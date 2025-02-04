
import mongoose from "mongoose";
import config from "../../config";
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import academicSemestersModel from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interfaces";
import { studentsModel } from "../student/student.model";
import { TUser } from "./user.interfaces";
import { UsersModel } from "./user.model";
import { generateAdminId, generateFacultyId, generateStudentId } from "./user.utils";
import AppError from "../../errors/AppErrors";
import { TFaculty } from "../faculty/faculty.interfaces";
import { facultysModel } from "../faculty/faculty.model";
import { TAdmin } from "../admin/admin.interfaces";
import { adminsModel } from "../admin/admin.model";
import { verifyToken } from "../auth/auth.utils";
import { JwtPayload } from "jsonwebtoken";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";

const createStudnetIntoDb = async (password : string , studentData : Partial<TStudent>) => {

    const userData : Partial<TUser> = {} ;
    userData.role = 'student' ;
    userData.email = studentData?.email ;

    const academicDetails = await academicSemestersModel.findById(studentData.admissionSemester) ;
    
    const session = await mongoose.startSession() ;
    try {
        session.startTransaction() ;
        userData.id = await generateStudentId(academicDetails as TAcademicSemester) ;
        userData.password = password || config.defaultPass as string ;
        
        await sendImageToCloudinary() ;
        
        const newUser = await UsersModel.create([userData] , {session}) ;
        if(!newUser?.length){
            throw new AppError(500 , 'Failed to create user') ;
        }

        studentData.id = newUser[0]?.id ;
        studentData.user = newUser[0]?._id ;

        const newStudent = await studentsModel.create([studentData] , {session}) ;

        if(!newStudent?.length){
            throw new AppError(500 , 'Failed to create student') ;
        }

        await session.commitTransaction() ;
        await session.endSession() ;
        return newStudent ;
    } catch (error) {
        console.log(error)
        await session.abortTransaction() ;
        await session.endSession() ;
        throw new AppError(500 , 'Failed to create student !') ;
    }
}

const createFacultyIntoDb = async (password : string , facultyData : Partial<TFaculty>) => {
    const userData : Partial<TUser> = {} ;
    userData.role = 'faculty' ;
    userData.email = facultyData?.email ;

    const session = await mongoose.startSession() ;
    try {
        
        session.startTransaction() ;
        userData.id = await generateFacultyId() ;
        userData.password = password ;

        const newUser = await UsersModel.create([userData] , {session}) ;
        if(!newUser?.length){
            throw new AppError(500 , 'Failed to create user') ;
        }
        
        facultyData.id = newUser[0]?.id ;
        facultyData.user = newUser[0]?._id ;
        
        const newFaculty = await facultysModel.create([facultyData] , {session}) ;
        if(!newFaculty?.length){
            throw new AppError(500 , 'Failed to create faculty') ;
        }
        await session.commitTransaction() ;
        await session.endSession() ;
        return newFaculty ;

    } catch (error) {
        await session.abortTransaction() ;
        await session.endSession() ;
        throw new AppError(500 , 'Failed to create faculty') ;
    }
}

const createAdminIntoDb = async (password : string , adminData : Partial<TAdmin>) => {
    const userData : Partial<TUser> = {} ;
    userData.role = 'admin' ;
    userData.email = adminData?.email ;

    const session = await mongoose.startSession() ;
    try {
        
        session.startTransaction() ;
        userData.id = await generateAdminId() ;
        userData.password = password ;

        const newUser = await UsersModel.create([userData] , {session}) ;
        if(!newUser?.length){
            throw new AppError(500 , 'Failed to create user') ;
        }
        
        adminData.id = newUser[0]?.id ;
        adminData.user = newUser[0]?._id ;
        
        const newAdmin = await adminsModel.create([adminData] , {session}) ;
        if(!newAdmin?.length){
            throw new AppError(500 , 'Failed to create admin') ;
        }
        await session.commitTransaction() ;
        await session.endSession() ;
        return newAdmin ;

    } catch (error) {
        await session.abortTransaction() ;
        await session.endSession() ;
        throw new AppError(500 , 'Failed to create admin') ;
    }
}

const getMeFromDb = async (userId : string , role : string) => {
    let result = null ;
    if(role === "admin"){
        result = await adminsModel.findOne({id : userId}).populate("user") ;
    }
    
    if(role === "faculty"){
        result = await facultysModel.findOne({id : userId}).populate("user") ;
    }

    if(role === "student"){
        result = await studentsModel.findOne({id : userId}).populate("user") ;
    }
    return result ;
}

const changeStatusIntoDb = async (id : string , payload : { status : string }) => {
    const result = await UsersModel.findByIdAndUpdate(id , payload , {new : true}) ;
    return result ;
}

export const userService = {
    getMeFromDb ,
    createAdminIntoDb ,
    changeStatusIntoDb ,
    createStudnetIntoDb ,
    createFacultyIntoDb ,
}
