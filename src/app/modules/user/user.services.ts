
import mongoose from "mongoose";
import config from "../../config";
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
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import academicSemestersModel from "../academicsemester/academicsemester.model";
import { TAcademicSemester } from "../academicsemester/academicSemester.interface";
import httpStatus from 'http-status'
import { academicDepartmentsModel } from "../academicDepartment/academicDepartment.model";

const createStudnetIntoDb = async (file : any , password : string , studentData : Partial<TStudent>) => {

    const userData : Partial<TUser> = {} ;
    userData.role = 'student' ;
    userData.email = studentData?.email ;

    const academicDetails = await academicSemestersModel.findById(studentData.admissionSemester) ;
    if(!academicDetails){
        throw new AppError(httpStatus.NOT_FOUND , "Academic semester not found !") ;
    }

    const academicDepartment = await academicDepartmentsModel.findById(studentData.academicDepartment) ;
    if(!academicDepartment){
        throw new AppError(httpStatus.NOT_FOUND , "Academic department not found !") ;
    }
    studentData.academicFaculty = academicDepartment?.academicFaculty ;

    const session = await mongoose.startSession() ;
    try {
        session.startTransaction() ;
        userData.id = await generateStudentId(academicDetails as TAcademicSemester) ;
        userData.password = password || config.defaultPass as string ;
        
        const path = file?.path ;
        const imageName = `${userData?.id}${studentData?.name?.firstName}` ;
        const {secure_url} = await sendImageToCloudinary(imageName , path) as any ;

        const newUser = await UsersModel.create([userData] , {session}) ;
        if(!newUser?.length){
            throw new AppError(500 , 'Failed to create user') ;
        }

        studentData.id = newUser[0]?.id ;
        studentData.user = newUser[0]?._id ;
        studentData.profileImg = secure_url ;

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

const createFacultyIntoDb = async (file : any , password : string , facultyData : Partial<TFaculty>) => {
    const userData : Partial<TUser> = {} ;
    userData.role = 'faculty' ;
    userData.email = facultyData?.email ;

    const session = await mongoose.startSession() ;
    try {
        
        session.startTransaction() ;
        userData.id = await generateFacultyId() ;
        userData.password = password ;

        const path = file?.path ;
        const imageName = `${userData?.id}${facultyData?.name?.firstName}` ;
        const {secure_url} = await sendImageToCloudinary(imageName , path) as any ;

        const newUser = await UsersModel.create([userData] , {session}) ;
        if(!newUser?.length){
            throw new AppError(500 , 'Failed to create user') ;
        }
        
        facultyData.id = newUser[0]?.id ;
        facultyData.user = newUser[0]?._id ;
        facultyData.profileImg = secure_url ;
        
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

const createAdminIntoDb = async (file : any , password : string , adminData : Partial<TAdmin>) => {
    const userData : Partial<TUser> = {} ;
    userData.role = 'admin' ;
    userData.email = adminData?.email ;

    const session = await mongoose.startSession() ;
    try {
        
        session.startTransaction() ;
        userData.id = await generateAdminId() ;
        userData.password = password ;

        const path = file?.path ;
        const imageName = `${userData?.id}${adminData?.name?.firstName}` ;
        const {secure_url} = await sendImageToCloudinary(imageName , path) as any ;

        const newUser = await UsersModel.create([userData] , {session}) ;
        if(!newUser?.length){
            throw new AppError(500 , 'Failed to create user') ;
        }
        
        adminData.id = newUser[0]?.id ;
        adminData.user = newUser[0]?._id ;
        adminData.profileImg = secure_url ;
        
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
