
import { academicSemesterNameCodeMapper } from "./academicSemester.constant";
import { TAcademicSemester } from "./academicSemester.interface";
import academicSemestersModel from "./academicSemester.model";

const createacademicSemesterIntoDb = async (data : TAcademicSemester) => {
    if(academicSemesterNameCodeMapper[data?.name] !== data?.code){
        throw new Error("Invalid Semester Code !") ;
    }
    const newAcademicSemester = await academicSemestersModel.create(data) ;
    return newAcademicSemester ;
}

const getAllAcademicSemesterFromDb = async () => {
    const academicSemesters = await academicSemestersModel.find() ;
    return academicSemesters ;
}

const getAcademicSemesterFromDb = async (id : string) => {
    const academicSemester = await academicSemestersModel.findById(id) ;
    return academicSemester ;
}

const updateAcademicSemesterIntoDb = async (id : string , data : Partial<TAcademicSemester>) => {
    const academicSemester = await academicSemestersModel.updateOne({_id : id} , { $set : { ...data } }) ;
    return academicSemester ;
}

export const academicSemesterServices = {
    getAcademicSemesterFromDb ,
    createacademicSemesterIntoDb ,
    getAllAcademicSemesterFromDb ,
    updateAcademicSemesterIntoDb ,
}
