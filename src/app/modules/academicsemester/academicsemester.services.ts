
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

export const academicSemesterServices = {
    createacademicSemesterIntoDb ,
}
