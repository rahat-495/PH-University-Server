import QueryBuilder from "../../builder/QueryBuilder";
import { semesterRegistrationSearchAbleFields } from "./semesterRegistration.constant";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { semesterRegistrationsModel } from "./semesterRegistration.model";

const createSemesterRegistrationIntoDb = async (payload: TSemesterRegistration) => {
    const result = await semesterRegistrationsModel.create(payload) ;
    return result ;
}

const getAllSemesterRegistrationFromDb = async (query : Record<string , unknown>) => {
    const courseQuery = new QueryBuilder(semesterRegistrationsModel.find().populate("preRequisiteCourses.course") , query).search(semesterRegistrationSearchAbleFields).filter().sort().paginate().fields() ;
    const result = await courseQuery.modelQuery ;
    return result ;
}

const getSingleSemesterRegistrationFromDb = async (id : string) => {
    const result = await semesterRegistrationsModel.findById(id) ;
    return result ;
}

const updateSemesterRegistrationIntoDb = async (id : string , payload : Partial<TSemesterRegistration>) => {
    return {} ;
}

export const semesterRegistrationServices = {
    createSemesterRegistrationIntoDb ,
    getAllSemesterRegistrationFromDb ,
    updateSemesterRegistrationIntoDb ,
    getSingleSemesterRegistrationFromDb ,
}
