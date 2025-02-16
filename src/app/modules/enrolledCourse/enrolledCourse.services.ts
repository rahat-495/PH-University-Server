
import AppError from "../../errors/AppErrors";
import { offeredCoursesModel } from "../offeredCourse/offeredCourse.model";
import httpStatus from "http-status";
import { studentsModel } from "../student/student.model";
import { enrolledCoursesModel } from "./enrolledCourse.model";
import mongoose from "mongoose";
import { semesterRegistrationsModel } from "../semesterRegistration/semesterRegistration.model";
import { TEnrolledCourse } from "./enrolledCourse.interfaces";
import { facultysModel } from "../faculty/faculty.model";
import calculateGradeAndPoints from "./enrolledCourse.utils";

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

const updateEnrolledCourseMarksIntoDb = async (facultyId : string , payload : Partial<TEnrolledCourse>) => {
    const {semesterRegistration , offeredCourse , student , courseMarks} = payload ;

    const isSemesterRegistrationAxist = await semesterRegistrationsModel.findById(semesterRegistration) ;
    if(!isSemesterRegistrationAxist){
        throw new AppError(httpStatus.NOT_FOUND , "Semester Registration not found !") ;
    }
    
    const isStudentAxist = await studentsModel.findById(student) ;
    if(!isStudentAxist){
        throw new AppError(httpStatus.NOT_FOUND , "Student not found !") ;
    }

    const isOfferedCourseAxist = await offeredCoursesModel.findById(offeredCourse) ;
    if(!isOfferedCourseAxist){
        throw new AppError(httpStatus.NOT_FOUND , "Offered course not found !") ;
    }
    
    const faculty = await facultysModel.findOne({id : facultyId} , {_id : 1}) ;
    const isCourseBelongToFaculty = await enrolledCoursesModel.findOne({ semesterRegistration , student , offeredCourse , faculty : faculty?._id }) ;
    if(!isCourseBelongToFaculty){
        throw new AppError(httpStatus.FORBIDDEN , "You are forbidden !") ;
    }

    const modifiedData : Record<string , unknown> = { ...courseMarks } ;

    if(courseMarks?.finelTerm){
        const {classTest1 , classTest2 , midTerm , finelTerm} = isCourseBelongToFaculty?.courseMarks ;
        const totalMarks = Math.ceil(classTest1) + Math.ceil(midTerm) + Math.ceil(classTest2) + Math.ceil(finelTerm) ;
        const result = calculateGradeAndPoints(totalMarks);
        modifiedData.isCompleted = true ;
        modifiedData.grade = result.grade ;
        modifiedData.gradePoints = result.gradePoints ;
    }

    if(courseMarks && Object.keys(courseMarks).length){
        for(const [key , value] of Object.entries(courseMarks)){
            modifiedData[`courseMarks.${key}`] = value ;
        }
    }

    const result = await enrolledCoursesModel.findByIdAndUpdate(isCourseBelongToFaculty?._id , modifiedData , {new : true}) ;
    return result ;
}

export const enrolledCourseSerivces = {
    createEnrolledCourseIntoDb ,
    updateEnrolledCourseMarksIntoDb ,
}
