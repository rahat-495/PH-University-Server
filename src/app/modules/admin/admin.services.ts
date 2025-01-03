
import mongoose from "mongoose";
import AppError from "../../errors/AppErrors";
import { UsersModel } from "../user/user.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { adminsModel } from "./admin.model";
import { TAdmin } from "./admin.interfaces";
import { adminsSearchAbleFields } from "./admin.constand";

const getAllAdminFromDb = async (query : Record<string , unknown>) => {
    const studentQuery = new QueryBuilder(adminsModel.find() , query).search(adminsSearchAbleFields).filter().sort().paginate().fields() ;
    const result = await studentQuery.modelQuery ;
    return result ;
}

const getSpecificAdminFromDb = async (id : string) => {
    const result = await adminsModel.findById(id) ;
    return result ;
}

const updateSingleAdminIntoDb = async (id : string , payload : Partial<TAdmin>) => {
    const {name , ...remainingFacultyData} = payload ;
    const modifiedUpdateData : Record<string , unknown> = {...remainingFacultyData} ;

    if(name && Object.keys(name).length){
        for(const [key , value] of Object.entries(name)){
            modifiedUpdateData[`name.${key}`] = value ;
        }
    }

    const result = await adminsModel.findByIdAndUpdate(id , modifiedUpdateData , {new : true , runValidators : true}) ;
    return result ;
}

const deleteSingleAdminFromDb = async (id : string) => {
    const session = await mongoose.startSession() ;
    try {
        
        session.startTransaction() ;
        const deletedAdmin = await adminsModel.findByIdAndUpdate(id , {isDeleted : true} , {new : true , session}) ;
        if(!deletedAdmin){
            throw new AppError(400 , "Failed to delete admin") ;
        }
        
        const deletedUser = await UsersModel.findByIdAndUpdate(deletedAdmin.user , {isDeleted : true} , {new : true , session}) ;
        if(!deletedUser){
            throw new AppError(400 , "Failed to delete user") ;
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
