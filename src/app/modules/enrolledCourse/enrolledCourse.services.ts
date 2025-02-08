
import AppError from "../../errors/AppErrors";
import { offeredCoursesModel } from "../offeredCourse/offeredCourse.model";
import httpStatus from "http-status";
import { studentsModel } from "../student/student.model";
import { enrolledCoursesModel } from "./enrolledCourse.model";
import mongoose from "mongoose";
import { semesterRegistrationsModel } from "../semesterRegistration/semesterRegistration.model";

const createEnrolledCourseIntoDb = async (userId : string , payload : { offeredCourse : string } ) => {
    const {offeredCourse} = payload ;
    const isOfferedCourseAxist = await offeredCoursesModel.findById(offeredCourse).populate("course") as any ;
    const semesterRegistration = await semesterRegistrationsModel.findById(isOfferedCourseAxist?.semesterRegistration) as any ;
    
    if(!isOfferedCourseAxist){
        throw new AppError(httpStatus.NOT_FOUND , "Offered course not found !") ;
    }
    
    if(isOfferedCourseAxist?.maxCapacity <= 0){
        throw new AppError(httpStatus.BAD_GATEWAY  , "The room is full !") ;
    }

    const student = await studentsModel.findOne({id : userId},{_id : 1}) ;
    const isStudentAlreadyEnrolled = await enrolledCoursesModel.findOne({ offeredCourse , student : student?._id , semesterRegistration : isOfferedCourseAxist?.semesterRegistration }) ;
    if(isStudentAlreadyEnrolled){
        throw new AppError(httpStatus.CONFLICT , "Student already enrolled !") ;
    }

    const enrolledCourse = await enrolledCoursesModel.aggregate([
        { $match : { semesterRegistration : isOfferedCourseAxist?.semesterRegistration , student : student?._id } } ,
        { $lookup : { from : "courses" , localField : "course" , foreignField : "_id" , as : "enrolledCourseData" } } ,
        { $unwind : "$enrolledCourseData" } ,
        { $group : {_id : null , totalEnrolledCredits : { $sum : "$enrolledCourseData.credits" }} }
    ])

    const totalCredits = enrolledCourse.length ? enrolledCourse[0]?.totalEnrolledCredits : 0 ;
    if(totalCredits && totalCredits + isOfferedCourseAxist?.course?.credits > semesterRegistration?.maxCredit){
        throw new AppError(httpStatus.BAD_REQUEST , "You have exceeded maximum number of credits !")
    }

    const session = await mongoose.startSession() ;
    try {

        await session.startTransaction() ;
        
        const payloadData = [{
            semesterRegistration : isOfferedCourseAxist?.semesterRegistration ,
            academicSemester : isOfferedCourseAxist?.academicSemester ,
            academicFaculty : isOfferedCourseAxist?.academicFaculty ,
            academicDepartment : isOfferedCourseAxist?.academicDepartment ,
            course : isOfferedCourseAxist?.course ,
            student : student?._id ,
            faculty : isOfferedCourseAxist?.faculty ,
            isEnrolled : true ,
            offeredCourse : isOfferedCourseAxist?._id ,
        }];
        const result = await enrolledCoursesModel.create(payloadData , {session}) ;

        if(!result){
            throw new AppError(httpStatus.BAD_REQUEST , "Enrolle in course is failed !") ;
        }

        await offeredCoursesModel.findByIdAndUpdate(offeredCourse , { maxCapacity : isOfferedCourseAxist?.maxCapacity - 1 } , {session}) ;
        
        await session.commitTransaction() ;
        await session.endSession() ;
        return result ;
    }catch(error){
        console.log(error)
        await session.abortTransaction() ;
        await session.endSession() ;
        throw new AppError(500 , "Can't enrolled this course !") ;
    }
}

export const enrolledCourseSerivces = {
    createEnrolledCourseIntoDb ,
}
