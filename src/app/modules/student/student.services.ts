
import mongoose from "mongoose";
import { studentsModel } from "./student.model"
import AppError from "../../errors/AppErrors";
import { UsersModel } from "../user/user.model";
import { TStudent } from "./student.interfaces";
import QueryBuilder from "../../builder/QueryBuilder";
import { studentsSearchAbleFields } from "./student.constand";

const getAllStudentsFromDb = async (query : Record<string , unknown>) => {
    const queryObj = {...query} ;

    let searchTerm = "" ;
    if(query.searchTerm){
        searchTerm = query.searchTerm as string ;
    }

    const searchQuery = studentsModel.find({
        $or : studentsSearchAbleFields.map((field) => ({ [field] : {$regex : searchTerm , $options : "i"} }))
    }) ;

    const excludeFields = ["searchTerm" , "page" , "limit" , "sort" , "fields"] ;
    excludeFields.forEach((el) => delete queryObj[el]) ;
    const filterQuery = searchQuery.find(queryObj).populate("admissionSemester").populate({path : "academicDepartment" , populate : {path : "academicFaculty"}}) ;

    let sort = '-createdAt' ;
    if(query.sort){
        sort = query.sort as string ;
    }
    const sortQuery = filterQuery.sort(sort) ;

    let limit = 1 ;
    let page = 1 ;
    let skip = 0 ;

    if(query.limit){
        limit = Number(query.limit) ;
    }

    if(query.page){
        page = Number(query.page) ;
        skip = (page - 1) * limit ;
    }

    const paginateQuery = sortQuery.skip(skip) ;

    const limitQuery = paginateQuery.limit(limit) ;

    let fields = "-__v" ;
    if(query.fields){
        fields = (query.fields as string).split(",").join(" ") ;
    }

    const finalQuery = await limitQuery.select(fields) ;

    // return finalQuery ;

    const studentQuery = new QueryBuilder(studentsModel.find() , query).search(studentsSearchAbleFields).filter().sort().paginate().fields() ;
    const result = await studentQuery.modelQuery ;
    return result ;
}

const getSpecificStudentFromDb = async (id : string) => {
    const result = await studentsModel.findOne({id}).populate("admissionSemester").populate({path : "academicDepartment" , populate : {path : "academicFaculty"}}) ;
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

    console.log(modifiedUpdateData)

    const result = await studentsModel.findOneAndUpdate({id} , modifiedUpdateData , {new : true , runValidators : true}) ;
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
