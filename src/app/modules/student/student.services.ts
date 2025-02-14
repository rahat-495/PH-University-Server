
import mongoose from "mongoose";
import { studentsModel } from "./student.model"
import AppError from "../../errors/AppErrors";
import { UsersModel } from "../user/user.model";
import { TStudent } from "./student.interfaces";
import QueryBuilder from "../../builder/QueryBuilder";
import { studentsSearchAbleFields } from "./student.constand";

const getAllStudentsFromDb = async (query : Record<string , unknown>) => {
    const studentQuery = new QueryBuilder(studentsModel.find().populate("admissionSemester").populate({path : "academicDepartment" , populate : { path : "academicFaculty" }}), query).search(studentsSearchAbleFields).filter().sort().paginate().fields() ;
    const meta = await studentQuery.countTotal() ;
    const result = await studentQuery.modelQuery ;
    return {meta , result} ;
}

const getSpecificStudentFromDb = async (id : string) => {
    const result = await studentsModel.findById(id).populate("admissionSemester").populate({path : "academicDepartment" , populate : {path : "academicFaculty"}}) ;
    return result ;
}

const updateAStudentIntoDb = async (id : string , payload : Partial<TStudent>) => {
    const {name , guardian , localGuardian , ...remainingStudentData} = payload ;
    const modifiedUpdateData : Record<string , unknown> = {...remainingStudentData} ;

    if(name && Object.keys(name).length){
        for(const [key , value] of Object.entries(name)){
            modifiedUpdateData[`name.${key}`] = value ;
        }
    }

    if(guardian && Object.keys(guardian).length){
        for(const [key , value] of Object.entries(guardian)){
            modifiedUpdateData[`guardian.${key}`] = value ;
        }
    }

    if(localGuardian && Object.keys(localGuardian).length){
        for(const [key , value] of Object.entries(localGuardian)){
            modifiedUpdateData[`localGuardian.${key}`] = value ;
        }
    }

    const result = await studentsModel.findByIdAndUpdate(id , modifiedUpdateData , {new : true , runValidators : true}) ;
    return result ;
}

const deleteAStudentFromDb = async (id : string) => {
    const session = await mongoose.startSession() ;
    try {
        
        session.startTransaction() ;
        const deletedStudent = await studentsModel.findByIdAndUpdate(id , {isDeleted : true} , {new : true , session}) ;
        if(!deletedStudent){
            throw new AppError(400 , "Failed to delete student") ;
        }
        
        const deletedUser = await UsersModel.findByIdAndUpdate(deletedStudent.user , {isDeleted : true} , {new : true , session}) ;
        if(!deletedUser){
            throw new AppError(400 , "Failed to delete user") ;
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
