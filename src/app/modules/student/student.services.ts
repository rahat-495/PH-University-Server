
import { studentsModel } from "./student.model"

const getAllStudentsFromDb = async () => {
    const result = await studentsModel.find().populate("admissionSemester").populate({path : "academicDepartment" , populate : {path : "academicFaculty"}}) ;
    return result ;
}

const getSpecificStudentFromDb = async (id : string) => {
    const result = await studentsModel.findById(id).populate("admissionSemester").populate({path : "academicDepartment" , populate : {path : "academicFaculty"}}) ;
    return result ;
}

const deleteAStudentFromDb = async (id : string) => {
    const result = await studentsModel.deleteOne({_id : id}) ;
    return result ;
}

export const studentServices = {
    deleteAStudentFromDb,
    getAllStudentsFromDb ,
    getSpecificStudentFromDb
}
