
import { NextFunction, Request, Response } from "express";
import { UsersModel } from "./user.model";
import { TAcademicSemester } from "../academicsemester/academicSemester.interface";

const findLastStudentId = async () => {
    const lastStudentId = await UsersModel.findOne({role : "student"} , {id : 1 , _id : 0}).sort({createdAt : -1}).lean() ;
    return lastStudentId?.id ? lastStudentId.id : undefined ;
}

export const generateStudentId = async (payload : TAcademicSemester) => {
    let currentId = (0).toString() ;
    const lastUserId = await findLastStudentId() ;
    
    const lastStudentyear = lastUserId?.substring(0,4) ;
    const lastStudentSemesterCode = lastUserId?.substring(4,6) ;
    const currnetYear = payload?.year ;
    const currnetCode = payload?.code ;
    
    if(lastUserId && lastStudentSemesterCode === currnetCode && lastStudentyear === currnetYear){
        currentId = lastUserId.substring(6) ;
    }
    
    let incrementId = (Number(currentId)+1).toString().padStart(4,'0') ;
    incrementId = `${payload?.year}${payload?.code}${incrementId}` ;
    return incrementId ;
}

const findLastFacultytId = async () => {
    const lastStudentId = await UsersModel.findOne({role : "faculty"} , {id : 1 , _id : 0}).sort({createdAt : -1}).lean() ;
    return lastStudentId?.id ? lastStudentId.id : undefined ;
}

export const generateFacultyId = async () => {
    let currentId = (0).toString() ;
    const lastUserId = await findLastFacultytId() ;
    if(lastUserId){
        currentId = lastUserId.substring(2) ;
    }
    let incrementId = (Number(currentId)+1).toString().padStart(4 , "0") ;
    incrementId = `F-${incrementId}` ;
    return incrementId ;
}

const findLastAdmintId = async () => {
    const lastStudentId = await UsersModel.findOne({role : "admin"} , {id : 1 , _id : 0}).sort({createdAt : -1}).lean() ;
    return lastStudentId?.id ? lastStudentId.id : undefined ;
}

export const generateAdminId = async () => {
    let currentId = (0).toString() ;
    const lastUserId = await findLastAdmintId() ;
    if(lastUserId){
        currentId = lastUserId.substring(2) ;
    }
    let incrementId = (Number(currentId)+1).toString().padStart(4 , "0") ;
    incrementId = `A-${incrementId}` ;
    return incrementId ;
}

export const parseTextDataToJsonData = (req : Request , res : Response , next : NextFunction) => {
    req.body = JSON.parse(req.body.data) ;
    next() ;
}
