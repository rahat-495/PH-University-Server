
import { TCourse } from "./course.interfaces";
import { coursesModel } from "./course.model";

const createCourseIntoDb = async (payload: TCourse) => {
    const result = await coursesModel.create(payload) ;
    return result ;
}

const getAllCourseFromDb = async () => {
    const result = await coursesModel.find() ;
    return result ;
}

const getSingleCourseFromDb = async () => {
    const result = await coursesModel.find() ;
    return result ;
}

const deleteCourseFromDb = async (id : string) => {
    const result = await coursesModel.findByIdAndUpdate(id , {isDeleted : true} , {new : true}) ;
    return result ;
}

export const courseServices = {
    createCourseIntoDb ,
    getAllCourseFromDb ,
    deleteCourseFromDb ,
    getSingleCourseFromDb ,
}
