
import { studentsModel } from "./student.model"

const getAllStudentsFromDb = async () => {
    const result = await studentsModel.find() ;
    return result ;
}

const getSpecificStudentFromDb = async (id : string) => {
    const result = await studentsModel.findById(id) ;
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
