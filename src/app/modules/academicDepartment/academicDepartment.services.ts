
import { TAcademicDepartment } from "./academicDepartment.interface";
import { academicDepartmentsModel } from "./academicDepartment.model";

const createAacademicDepartmentIntoDb = async (payload : TAcademicDepartment) => {
    const result = await academicDepartmentsModel.create(payload) ;
    return result ;
}

const getAllAcademicDepartmentFromDb = async () => {
    const result = await academicDepartmentsModel.find() ;
    return result ;
}

const getSpecificAcademicDepartmentFromDb = async (id : string) => {
    const result = await academicDepartmentsModel.findById(id) ;
    return result ;
}

const updateAcademicDepartmentIntoDb = async (id : string , payload : TAcademicDepartment) => {
    const result = await academicDepartmentsModel.updateOne({_id : id} , {$set : payload}) ;
    return result ;
}

export const academicDepartmentServices = {
    updateAcademicDepartmentIntoDb ,
    createAacademicDepartmentIntoDb,
    getAllAcademicDepartmentFromDb ,
    getSpecificAcademicDepartmentFromDb ,
}
