
import config from "../../config";
import { TStudent } from "../student/student.interfaces";
import { studentsModel } from "../student/student.model";
import { TAcademicSemester } from "./academicSemester.interface";
import academicSemestersModel from "./academicSemester.model";

const createacademicSemesterIntoDb = async (data : TAcademicSemester) => {
    const newAcademicSemester = await academicSemestersModel.create(data) ;
    return newAcademicSemester ;
}

export const academicSemesterServices = {
    createacademicSemesterIntoDb ,
}
