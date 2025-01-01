
import mongoose from "mongoose";
import AppError from "../../errors/AppErrors";
import { UsersModel } from "../user/user.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { facultysModel } from "./faculty.model";
import { TFaculty } from "./faculty.interfaces";
import { facultiesSearchAbleFields } from "./faculty.constand";

const getAllFacultiesFromDb = async (query : Record<string , unknown>) => {
    const studentQuery = new QueryBuilder(facultysModel.find().populate("academicFaculty").populate({path : "academicDepartment"}), query).search(facultiesSearchAbleFields).filter().sort().paginate().fields() ;
    const result = await studentQuery.modelQuery ;
    return result ;
}

const getSpecificFacultyFromDb = async (facultyId : string) => {
    const result = await facultysModel.findOne({facultyId}).populate("academicFaculty").populate({path : "academicDepartment"}) ;
    return result ;
}

const updateAFacultyIntoDb = async (facultyId : string , payload : Partial<TFaculty>) => {
    const {name , ...remainingFacultyData} = payload ;
    const modifiedUpdateData : Record<string , unknown> = {...remainingFacultyData} ;

    if(name && Object.keys(name).length){
        for(const [key , value] of Object.entries(name)){
            modifiedUpdateData[`name.${key}`] = value ;
        }
    }

    const result = await facultysModel.findOneAndUpdate({facultyId} , modifiedUpdateData , {new : true , runValidators : true}) ;
    return result ;
}

const deleteAFacultyFromDb = async (facultyId : string) => {
    const session = await mongoose.startSession() ;
    try {
        
        session.startTransaction() ;
        const deletedUser = await UsersModel.findOneAndUpdate({facultyId} , {isDeleted : true} , {new : true , session}) ;
        if(!deletedUser){
            throw new AppError(400 , "Failed to delete user") ;
        }

        const deletedFaculty = await facultysModel.findOneAndUpdate({facultyId} , {isDeleted : true} , {new : true , session}) ;
        if(!deletedFaculty){
            throw new AppError(400 , "Failed to delete faculty") ;
        }

        await session.commitTransaction() ;
        await session.endSession() ;
        return deletedFaculty ;
    } catch (error) {
        await session.abortTransaction() ;
        await session.endSession() ;
        throw new AppError(500 , "Failed to delete faculty") ;
    }
}

export const facultyServices = {
    deleteAFacultyFromDb,
    getAllFacultiesFromDb ,
    updateAFacultyIntoDb ,
    getSpecificFacultyFromDb
}
