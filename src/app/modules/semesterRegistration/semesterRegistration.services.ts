
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppErrors";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { semesterRegistrationsModel } from "./semesterRegistration.model";

const createSemesterRegistrationIntoDb = async (payload: TSemesterRegistration) => {
    const isAnySemesterUpcomingOrOngoing = await semesterRegistrationsModel.findOne({ $or : [ {status : "UPCOMING"} , {status : "ONGOING"} ] }) ;
    if(isAnySemesterUpcomingOrOngoing){
        throw new AppError(400 , `There is already a ${isAnySemesterUpcomingOrOngoing.status} registrered semester !`) ;
    }
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
    const isSemesterRegistrationAxist = await semesterRegistrationsModel.findById(id) ;

    if(!isSemesterRegistrationAxist){
        throw new AppError(404 , "Semester registration not found !") ;
    }

    const currentSemesterStatus = isSemesterRegistrationAxist?.status ;
    
    if(currentSemesterStatus === "ENDED"){
        throw new AppError(400 , `This semeter already ${currentSemesterStatus} !`)
    }

    return {} ;
}

export const semesterRegistrationServices = {
    createSemesterRegistrationIntoDb ,
    getAllSemesterRegistrationFromDb ,
    updateSemesterRegistrationIntoDb ,
    getSingleSemesterRegistrationFromDb ,
}
