
import QueryBuilder from "../../builder/QueryBuilder";
import { courseSearchAbleFields } from "./course.constant";
import { TCourse, TCourseFaculties } from "./course.interfaces";
import { coursesModel } from "./course.model";
import AppError from "../../errors/AppErrors";
import mongoose from "mongoose";

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
    const session = await mongoose.startSession() ;

    try {
        session.startTransaction() ;
        const updateBasicCourseIntoDb = await coursesModel.findByIdAndUpdate(id , { $set : {...courseRemainingData} } , {runValidators : true , session}) ;
        if(!updateBasicCourseIntoDb){
            throw new AppError(400 , "Course Basic Update Failed !") ;
        }


        if(preRequisiteCourses && preRequisiteCourses.length){
            const deletedPreRequisites = preRequisiteCourses.filter((el) => el.course && el.isDeleted).map(el => el.course) ;
            const deletedPreRequisiteCourses = await coursesModel.findByIdAndUpdate(id , { $pull : { preRequisiteCourses : { course : { $in : deletedPreRequisites } } } } , { runValidators : true , session }) ;
            if(!deletedPreRequisiteCourses){
                throw new AppError(400 , "Delete PreRequisite Course Update Failed !") ;
            }
            
            const addingPreRequisites = preRequisiteCourses?.filter((el) => el.course && !el.isDeleted).map((el) => ({course : el.course})) ;
            const addingPreRequisitesCourses = await coursesModel.findByIdAndUpdate(id , { $addToSet : { preRequisiteCourses : { $each : addingPreRequisites } } } , { runValidators : true , session }) ;
            if(!addingPreRequisitesCourses){
                throw new AppError(400 , "Adding PreRequisite Course Update Failed !") ;
            }

        }

        await session.commitTransaction() ;
        await session.endSession() ;
    
        const result = await coursesModel.findById(id).populate("preRequisiteCourses.course") ;
        return result ;

    } catch (error) {
        console.log(error)
        await session.abortTransaction() ;
        await session.endSession() ;
        throw new AppError(400 , "Course Update Failed !") ;
    }
}

const deleteCourseIntoDb = async (id : string) => {
    const result = await coursesModel.findByIdAndUpdate(id , {isDeleted : true} , {new : true}) ;
    return result ;
}

const assignFacultiesIntoDb = async (id : string , payload : Partial<TCourseFaculties>) => {
    const result = await coursesModel.findByIdAndUpdate(id , {isDeleted : true} , {new : true}) ;
    return result ;
}

export const courseServices = {
    createCourseIntoDb ,
    updateCourseIntoDb ,
    getAllCourseFromDb ,
    deleteCourseIntoDb ,
    getSingleCourseFromDb ,
    assignFacultiesIntoDb ,
}
