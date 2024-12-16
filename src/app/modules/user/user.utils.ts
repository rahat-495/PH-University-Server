
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { UsersModel } from "./user.model";

const findLastUserId = async () => {
    const lastUserId = await UsersModel.findOne({role : "student"} , {id : 1 , _id : 0}).sort({createdAt : -1}).lean() ;
    return lastUserId?.id ? lastUserId.id.substring(6) : undefined ;
}

export const generateStudentId = async (payload : TAcademicSemester) => {
    const currentId = await findLastUserId() || (0).toString() ;
    let incrementId = (Number(currentId)+1).toString().padStart(4,'0') ;
    incrementId = `${payload?.year}${payload?.code}${incrementId}` ;
    return incrementId ;
}
