
import QueryBuilder from "../../builder/QueryBuilder";
import { courseSearchAbleFields } from "./course.constant";
import { TCourse } from "./course.interfaces";
import { coursesModel } from "./course.model";

const createCourseIntoDb = async (payload: TCourse) => {
    const result = await coursesModel.create(payload) ;
    return result ;
}

const getAllCourseFromDb = async (query : Record<string , unknown>) => {
    const courseQuery = new QueryBuilder(coursesModel.find() , query).search(courseSearchAbleFields).filter().sort().paginate().fields() ;
    const result = await courseQuery.modelQuery ;
    return result ;
}

const getSingleCourseFromDb = async () => {
    const result = await coursesModel.find() ;
    return result ;
}

const deleteCourseIntoDb = async (id : string) => {
    const result = await coursesModel.findByIdAndUpdate(id , {isDeleted : true} , {new : true}) ;
    return result ;
}

export const courseServices = {
    createCourseIntoDb ,
    getAllCourseFromDb ,
    deleteCourseIntoDb ,
    getSingleCourseFromDb ,
}
