
import QueryBuilder from "../../builder/QueryBuilder";
import { courseSearchAbleFields } from "./course.constant";
import { TCourse } from "./course.interfaces";
import { coursesModel } from "./course.model";

const createCourseIntoDb = async (payload: TCourse) => {
    const result = await coursesModel.create(payload) ;
    return result ;
}

const getAllCourseFromDb = async (query : Record<string , unknown>) => {
    const courseQuery = new QueryBuilder(coursesModel.find().populate("preRequisiteCourses.course") , query).search(courseSearchAbleFields).filter().sort().paginate().fields() ;
    const result = await courseQuery.modelQuery ;
    return result ;
}

const getSingleCourseFromDb = async (id : string) => {
    const result = await coursesModel.findById(id) ;
    return result ;
}

const updateCourseIntoDb = async (id : string , payload : Partial<TCourse>) => {
    const {preRequisiteCourses , ...courseRemainingData} = payload ;
    const updateBasicCourseIntoDb = await coursesModel.findByIdAndUpdate(id , { $set : {...courseRemainingData} } , {new : true , runValidators : true}) ;
    
    if(preRequisiteCourses && preRequisiteCourses.length){
        const deletedPreRequisites = preRequisiteCourses.filter((el) => el.course && el.isDeleted).map(el => el.course) ;
        const deletedPreRequisiteCourses = await coursesModel.findByIdAndUpdate(id , { $pull : { preRequisiteCourses : { course : { $in : deletedPreRequisites } } } }) ;
        return deletedPreRequisiteCourses ;
    }

    return updateBasicCourseIntoDb ;
}

const deleteCourseIntoDb = async (id : string) => {
    const result = await coursesModel.findByIdAndUpdate(id , {isDeleted : true} , {new : true}) ;
    return result ;
}

export const courseServices = {
    createCourseIntoDb ,
    updateCourseIntoDb ,
    getAllCourseFromDb ,
    deleteCourseIntoDb ,
    getSingleCourseFromDb ,
}
