
import { TAcademicSemester } from "./academicSemester.interface";
import academicSemestersModel from "./academicSemester.model";

const createacademicSemesterIntoDb = async (data : TAcademicSemester) => {
    type TAcademicSemesterNameCodeMapper = {
        [keys : string] : string ;
    } ;
    const academicSemesterNameCodeMapper : TAcademicSemesterNameCodeMapper = {
        Autumn : "01" ,
        Summer : "02" ,
        Fall : "03" ,
    }
    if(academicSemesterNameCodeMapper[data?.name] !== data?.code){
        throw new Error("Invalid Semester Code !") ;
    }
    const newAcademicSemester = await academicSemestersModel.create(data) ;
    return newAcademicSemester ;
}

export const academicSemesterServices = {
    createacademicSemesterIntoDb ,
}
