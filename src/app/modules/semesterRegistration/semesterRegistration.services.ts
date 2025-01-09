
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppErrors";
import { registrationStatus } from "./semesterRegistration.constant";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { semesterRegistrationsModel } from "./semesterRegistration.model";

const createSemesterRegistrationIntoDb = async (payload: TSemesterRegistration) => {
    const isAnySemesterUpcomingOrOngoing = await semesterRegistrationsModel.findOne({ $or : [ {status : registrationStatus.UPCOMING} , {status : registrationStatus.ONGOING} ] }) ;
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
    const requestedStatus = payload?.status ;
    
    if(currentSemesterStatus === registrationStatus.ENDED){
        throw new AppError(400 , `This semeter already ${currentSemesterStatus} !`)
    }

    if(currentSemesterStatus === registrationStatus.UPCOMING && requestedStatus === registrationStatus.ENDED){
        throw new AppError(400 , `You can't directly change status from ${currentSemesterStatus} to ${requestedStatus}`) ;
    }

    if(currentSemesterStatus === registrationStatus.ONGOING && requestedStatus === registrationStatus.UPCOMING){
        throw new AppError(400 , `You can't directly change status from ${currentSemesterStatus} to ${requestedStatus}`) ;
    }

    const result = await semesterRegistrationsModel.findByIdAndUpdate(id , payload , { new : true , runValidators : true }) ;
    return result ;
}

export const semesterRegistrationServices = {
    createSemesterRegistrationIntoDb ,
    getAllSemesterRegistrationFromDb ,
    updateSemesterRegistrationIntoDb ,
    getSingleSemesterRegistrationFromDb ,
}
