
import { TOfferedCourse } from "./offeredCourse.interface"

const createOfferedCourseIntoDb = async (payload: TOfferedCourse) => {
    // const result = await coursesModel.create(payload) ;
    // return result ;
}

const getAllOfferedCourseFromDb = async (query : Record<string , unknown>) => {
    // const courseQuery = new QueryBuilder(coursesModel.find().populate("preRequisiteCourses.course") , query).search(courseSearchAbleFields).filter().sort().paginate().fields() ;
    // const result = await courseQuery.modelQuery ;
    // return result ;
}

const getSingleOfferedCourseFromDb = async (id : string) => {
    // const result = await coursesModel.findById(id) ;
    // return result ;
}

const updateOfferedCourseIntoDb = async (id : string , payload : Partial<TOfferedCourse>) => {
    // const {preRequisiteCourses , ...courseRemainingData} = payload ;
}

export const offeredCourseServices = {
    createOfferedCourseIntoDb ,
    getAllOfferedCourseFromDb ,
    updateOfferedCourseIntoDb ,
    getSingleOfferedCourseFromDb ,
}
