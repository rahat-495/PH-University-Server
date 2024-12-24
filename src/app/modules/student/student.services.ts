
import mongoose from "mongoose";
import { studentsModel } from "./student.model"
import AppError from "../../errors/AppErrors";
import { UsersModel } from "../user/user.model";
import { TStudent } from "./student.interfaces";

const getAllStudentsFromDb = async () => {
    const result = await studentsModel.find().populate("admissionSemester").populate({path : "academicDepartment" , populate : {path : "academicFaculty"}}) ;
    return result ;
}

const getSpecificStudentFromDb = async (id : string) => {
    const result = await studentsModel.findOne({id}).populate("admissionSemester").populate({path : "academicDepartment" , populate : {path : "academicFaculty"}}) ;
    return result ;
}

const updateAStudentIntoDb = async (id : string , payload : Partial<TStudent>) => {
    const result = await studentsModel.findOneAndUpdate({id} , {$set : payload} , {new : true}) ;
    return result ;
}

const deleteAStudentFromDb = async (id : string) => {
    const session = await mongoose.startSession() ;
    try {
        
        session.startTransaction() ;
        const deletedUser = await UsersModel.findOneAndUpdate({id} , {isDeleted : true} , {new : true , session}) ;
        if(!deletedUser){
            throw new AppError(400 , "Failed to delete user") ;
        }

        const deletedStudent = await studentsModel.findOneAndUpdate({id} , {isDeleted : true} , {new : true , session}) ;
        if(!deletedStudent){
            throw new AppError(400 , "Failed to delete student") ;
        }

        await session.commitTransaction() ;
        await session.endSession() ;
        return deletedStudent ;
    } catch (error) {
        await session.abortTransaction() ;
        await session.endSession() ;
        throw new AppError(500 , "Failed to delete student") ;
    }
}

export const studentServices = {
    deleteAStudentFromDb,
    getAllStudentsFromDb ,
    updateAStudentIntoDb ,
    getSpecificStudentFromDb
}
