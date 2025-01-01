
import mongoose from "mongoose";
import AppError from "../../errors/AppErrors";
import { UsersModel } from "../user/user.model";
import QueryBuilder from "../../builder/QueryBuilder";

const getAllAdminFromDb = async (query : Record<string , unknown>) => {
    const studentQuery = new QueryBuilder(adminsModel.find().populate("academicFaculty").populate({path : "academicDepartment"}), query).search(facultiesSearchAbleFields).filter().sort().paginate().fields() ;
    const result = await studentQuery.modelQuery ;
    return result ;
}

const getSpecificAdminFromDb = async (adminId : string) => {
    const result = await adminsModel.findOne({adminId}).populate("academicFaculty").populate({path : "academicDepartment"}) ;
    return result ;
}

const updateSingleAdminIntoDb = async (adminId : string , payload : Partial<TFaculty>) => {
    const {name , ...remainingFacultyData} = payload ;
    const modifiedUpdateData : Record<string , unknown> = {...remainingFacultyData} ;

    if(name && Object.keys(name).length){
        for(const [key , value] of Object.entries(name)){
            modifiedUpdateData[`name.${key}`] = value ;
        }
    }

    const result = await adminsModel.findOneAndUpdate({adminId} , modifiedUpdateData , {new : true , runValidators : true}) ;
    return result ;
}

const deleteSingleAdminFromDb = async (adminId : string) => {
    const session = await mongoose.startSession() ;
    try {
        
        session.startTransaction() ;
        const deletedUser = await UsersModel.findOneAndUpdate({adminId} , {isDeleted : true} , {new : true , session}) ;
        if(!deletedUser){
            throw new AppError(400 , "Failed to delete user") ;
        }

        const deletedAdmin = await adminsModel.findOneAndUpdate({adminId} , {isDeleted : true} , {new : true , session}) ;
        if(!deletedAdmin){
            throw new AppError(400 , "Failed to delete admin") ;
        }

        await session.commitTransaction() ;
        await session.endSession() ;
        return deletedAdmin ;
    } catch (error) {
        await session.abortTransaction() ;
        await session.endSession() ;
        throw new AppError(500 , "Failed to delete admin") ;
    }
}

export const adminServices = {
    deleteSingleAdminFromDb,
    getAllAdminFromDb ,
    updateSingleAdminIntoDb ,
    getSpecificAdminFromDb
}
