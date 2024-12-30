
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { UsersModel } from "./user.model";

const findLastStudentId = async () => {
    const lastStudentId = await UsersModel.findOne({role : "student"} , {id : 1 , _id : 0}).sort({createdAt : -1}).lean() ;
    return lastStudentId?.id ? lastStudentId.id : undefined ;
}

export const generateStudentId = async (payload : TAcademicSemester) => {
    let currentId = (0).toString() ;
    const lastUserId = await findLastStudentId() ;
    
    const lastStudentyear = lastUserId?.substring(0,4) ;
    const lastStudentSemesterCode = lastUserId?.substring(4,6) ;
    const currnetYear = payload.year ;
    const currnetCode = payload.code ;
    
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
        currentId = lastUserId ;
    }
    let incrementId = (Number(currentId)+1).toString().padStart(4 , "0") ;
    incrementId = `F-${incrementId}` ;
    return incrementId ;
}
