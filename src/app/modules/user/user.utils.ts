
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { UsersModel } from "./user.model";

const findLastUserId = async () => {
    const lastUserId = await UsersModel.findOne({role : "student"} , {id : 1 , _id : 0}).sort({createdAt : -1}).lean() ;
    return lastUserId?.id ? lastUserId.id : undefined ;
}

export const generateStudentId = async (payload : TAcademicSemester) => {
    let currentId = (0).toString() ;
    const lastUserId = await findLastUserId() ;
    
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
