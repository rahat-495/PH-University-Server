
import { TAcademicFaculty } from "./academicFaculty.interfaces";
import { academicFacultysModel } from "./academicFaculty.model";

const createAacademicFacultyIntoDb = async (payload : TAcademicFaculty) => {
    const result = await academicFacultysModel.create(payload) ;
    return result ;
}

const getAllAcademicFacultiesFromDb = async () => {
    const result = await academicFacultysModel.find() ;
    return result ;
}

const getSpecificAcademicFacultyFromDb = async (id : string) => {
    const result = await academicFacultysModel.findById(id) ;
    return result ;
}

const updateAcademicFacultyIntoDb = async (id : string , payload : TAcademicFaculty) => {
    const result = await academicFacultysModel.updateOne({_id : id} , {$set : payload}) ;
    return result ;
}

export const academicFacultyServices = {
    updateAcademicFacultyIntoDb ,
    createAacademicFacultyIntoDb,
    getAllAcademicFacultiesFromDb ,
    getSpecificAcademicFacultyFromDb ,
}
