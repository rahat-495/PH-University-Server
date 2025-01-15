
import AppError from "../../errors/AppErrors";
import { academicDepartmentsModel } from "../academicDepartment/academicDepartment.model";
import { academicFacultysModel } from "../academicFaculty/academicFaculty.model";
import { coursesModel } from "../course/course.model";
import { facultysModel } from "../faculty/faculty.model";
import { semesterRegistrationsModel } from "../semesterRegistration/semesterRegistration.model";
import { TOfferedCourse } from "./offeredCourse.interface"
import { offeredCoursesModel } from "./offeredCourse.model";

const createOfferedCourseIntoDb = async (payload: TOfferedCourse) => {
    
    const {academicDepartment , academicFaculty , course , faculty , semesterRegistration } = payload ;
    
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

    const result = await offeredCoursesModel.create({...payload , academicSemester : isSemesterRegistrationAxist?.academicSemester}) ;
    return result ;
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
