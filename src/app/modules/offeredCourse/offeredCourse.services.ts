
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppErrors";
import { academicDepartmentsModel } from "../academicDepartment/academicDepartment.model";
import { academicFacultysModel } from "../academicFaculty/academicFaculty.model";
import { coursesModel } from "../course/course.model";
import { facultysModel } from "../faculty/faculty.model";
import { semesterRegistrationsModel } from "../semesterRegistration/semesterRegistration.model";
import { studentsModel } from "../student/student.model";
import { Days } from "./offeredCourse.constants";
import { TOfferedCourse } from "./offeredCourse.interface"
import { offeredCoursesModel } from "./offeredCourse.model";
import { hasTimeConflict } from "./offeredCourse.utils";
import httpStatus from 'http-status' ;

const createOfferedCourseIntoDb = async (payload: TOfferedCourse) => {
    
    const {academicDepartment , academicFaculty , course , faculty , semesterRegistration , section , days , startTime , endTime } = payload ;
    
    const isAcademicDepartmentAxist = await academicDepartmentsModel.findById(academicDepartment) ;
    if(!isAcademicDepartmentAxist){
        throw new AppError(404 , "Academic Department are not found !") ;
    }
    
    const isAcademicFacultyAxist = await academicFacultysModel.findById(academicFaculty) ;
    if(!isAcademicFacultyAxist){
        throw new AppError(404 , "Academic Faculty are not found !") ;
    }
    
    const isSemesterRegistrationAxist = await semesterRegistrationsModel.findById(semesterRegistration) ;
    if(!isSemesterRegistrationAxist){
        throw new AppError(404 , "Semester Registration are not found !") ;
    }
    
    const isCourseAxist = await coursesModel.findById(course) ;
    if(!isCourseAxist){
        throw new AppError(404 , "Course are not found !") ;
    }
    
    const isFacultyAxist = await facultysModel.findById(faculty) ;
    if(!isFacultyAxist){
        throw new AppError(404 , "Faculty are not found !") ;
    }
    
    const isDepartmentBelongToFaculty = await academicDepartmentsModel.findOne({ _id : academicDepartment , academicFaculty}) ;
    if(!isDepartmentBelongToFaculty){
        throw new AppError(404 , `This ${isAcademicDepartmentAxist?.name} is not belong to this ${isAcademicFacultyAxist?.name} !`) ;
    }
    
    const isOfferedCourseAxistWithSameSectionAndSemesterAndcourse = await offeredCoursesModel.findOne({ section , course , semesterRegistration }) ;
    if(isOfferedCourseAxistWithSameSectionAndSemesterAndcourse){
        throw new AppError(400 , `Offered Course with same section or semester registration is already axist !`) ;
    }
    
    const newSchedule = { days , startTime , endTime } ;
    
    const assignedSchedules = await offeredCoursesModel.find({faculty , semesterRegistration , days : { $in : days}}).select("startTime endTime days") ;
    
    if(hasTimeConflict(assignedSchedules , newSchedule)){
        throw new AppError(409 , `This faculty is not available at this time . Choose anothor time or day !`) ;
    }
    
    const result = await offeredCoursesModel.create({...payload , academicSemester : isSemesterRegistrationAxist?.academicSemester}) ;
    return result ;
}

const getAllOfferedCourseFromDb = async (query : Record<string , unknown>) => {
    const courseQuery = new QueryBuilder(coursesModel.find().populate("preRequisiteCourses.course") , query).filter().sort().paginate().fields() ;
    const result = await courseQuery.modelQuery ;
    return result ;
}

const getSingleOfferedCourseFromDb = async (id : string) => {
    const result = await offeredCoursesModel.findById(id) ;
    return result ;
}

const updateOfferedCourseIntoDb = async (id : string , payload : Pick<TOfferedCourse , "faculty" | "days" | "startTime" | "endTime">) => {
    const { faculty , days , startTime , endTime } = payload ;

    const isOfferedCourseAxist = await offeredCoursesModel.findById(id) ;
    if(!isOfferedCourseAxist){
        throw new AppError(404 , "Offered course are not found !") ;
    }

    const semesterRegistrationStatus = await semesterRegistrationsModel.findById(isOfferedCourseAxist?.semesterRegistration).select("status") ;
    if(semesterRegistrationStatus?.status !== "UPCOMING"){
        throw new AppError(404 , `You can't update this offered course as it is ${semesterRegistrationStatus?.status}`) ;
    }

    const isFacultyAxist = await facultysModel.findById(faculty) ;
    if(!isFacultyAxist){
        throw new AppError(404 , "Faculty are not found !") ;
    }

    const assignedSchedules = await offeredCoursesModel.find({faculty , semesterRegistration : isOfferedCourseAxist?.semesterRegistration , days : { $in : days}}).select("startTime endTime days") ;
    
    const newSchedule = { days , startTime , endTime } ;

    if(hasTimeConflict(assignedSchedules , newSchedule )){
        throw new AppError(409 , `This faculty is not available at this time . Choose anothor time or day !`) ;
    }

    const result = await offeredCoursesModel.findByIdAndUpdate(id , payload , { new : true });
    return result ;
}

const deleteOfferedCourseFromDb = async (id : string) => {
    const isOfferedCourseAxist = await offeredCoursesModel.findById(id) ;
    if(!isOfferedCourseAxist){
        throw new AppError(404 , "Offered course not found !") ;
    }
    
    const semesterRegistration = isOfferedCourseAxist?.semesterRegistration ;
    const semesterRegistrationStatus = await semesterRegistrationsModel.findById(semesterRegistration).select("status") ;
    if(semesterRegistrationStatus?.status !== "UPCOMING"){
        throw new AppError(404 , `Offered course can't update beacause the semester ${semesterRegistrationStatus?.status} !`) ;
    }

    const result = await offeredCoursesModel.findByIdAndDelete(id) ;
    return result ;
}

const getMyOfferedCoursesFromDb = async (id : string) => {
    const student = await studentsModel.findOne({id : id}) ;
    if(!student){
        throw new AppError(httpStatus.NOT_FOUND , "User is not found !") ;
    }
    
    const currentOnGoingSemester = await semesterRegistrationsModel.findOne({status : 'ONGOING'}) ;
    if(!currentOnGoingSemester){
        throw new AppError(httpStatus.NOT_FOUND , "There is no semester registration on going !") ;
    }
    
    const result = await offeredCoursesModel.aggregate([
        { 
            $match: { 
                semesterRegistration: currentOnGoingSemester?._id, 
                academicFaculty: student?.academicFaculty, 
                academicDepartment: student?.academicDepartment 
            } 
        },
        { 
            $lookup: { 
                from: "courses", 
                localField: "course", 
                foreignField: "_id", 
                as: "course" 
            } 
        },
        { $unwind: "$course" },
        { 
            $lookup: {
                from: "enrolledcourses",
                pipeline: [
                    { 
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ['$semesterRegistration', currentOnGoingSemester?._id] },
                                    { $eq: ['$student', student?._id] },
                                    { $eq: ['$isEnrolled', true] }
                                ]
                            }
                        }
                    }
                ],
                as: "enrolledCourse"
            }
        },
        { 
            $lookup: {
                from: "enrolledcourses",
                pipeline: [
                    { 
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ['$student', student?._id] },
                                    { $eq: ['$isCompleted', true] }
                                ]
                            }
                        }
                    }
                ],
                as: "completeCourses"
            }
        },
        { 
            $addFields: { 
                completeCourseIds: { 
                    $ifNull: [ 
                        { $map: { input: "$completeCourses", as: "completed", in: "$$completed.course" } }, 
                        [] 
                    ] 
                }
            } 
        },
        { 
            $addFields: { 
                isPrerequisitesFullFiiled: { 
                    $or: [ 
                        { $eq: ["$course.preRequisiteCourses", []] }, 
                        { $setIsSubset: ["$course.preRequisiteCourses.course", "$completeCourseIds"] }
                    ]
                }
            } 
        },
        { 
            $addFields: { 
                isAlreadyEnrolled: { 
                    $in: [
                        "$course._id",  
                        { $map: { input: "$enrolledCourse", as: "enroll", in: "$$enroll.course" } }
                    ] 
                } 
            } 
        },
        { 
            $match: { 
                isAlreadyEnrolled: false, 
                isPrerequisitesFullFiiled: true 
            } 
        }
    ]);
    
    return result;
    
}

export const offeredCourseServices = {
    createOfferedCourseIntoDb ,
    getAllOfferedCourseFromDb ,
    updateOfferedCourseIntoDb ,
    deleteOfferedCourseFromDb ,
    getMyOfferedCoursesFromDb ,
    getSingleOfferedCourseFromDb ,
}
