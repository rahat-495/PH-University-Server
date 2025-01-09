import QueryBuilder from "../../builder/QueryBuilder";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { semesterRegistrationsModel } from "./semesterRegistration.model";

const createSemesterRegistrationIntoDb = async (payload: TSemesterRegistration) => {
    const isAnySemesterUpcomingOrOngoing = await semesterRegistrationsModel.findOne({ $or : [ {status : "UPCOMING"} ] })
    const result = await semesterRegistrationsModel.create(payload) ;
    return result ;
}

const getAllSemesterRegistrationFromDb = async (query : Record<string , unknown>) => {
    const semesterRegistratoinQuery = new QueryBuilder(semesterRegistrationsModel.find().populate("academicSemester") , query).filter().sort().paginate().fields() ;
    const result = await semesterRegistratoinQuery.modelQuery ;
    return result ;
}

const getSingleSemesterRegistrationFromDb = async (id : string) => {
    const result = await semesterRegistrationsModel.findById(id).populate("academicSemester") ;
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
