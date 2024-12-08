
import { studentsModel } from "./student.model"

const getAllStudentsFromDb = async () => {
    const result = await studentsModel.find() ;
    return result ;
}

export const studentServices = {
    getAllStudentsFromDb ,
}
