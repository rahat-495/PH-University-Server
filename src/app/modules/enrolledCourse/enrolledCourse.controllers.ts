
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { enrolledCourseSerivces } from "./enrolledCourse.services";

const createEnrolledCourse = catchAsync(async (req , res) => {
    const result = await enrolledCourseSerivces.createEnrolledCourseIntoDb(req.user.userId , req.body) ;
    if(result){
        sendResponse
        <object>(res , {data : result , statusCode : 200 , success : true , message : "Enrolled Course Creatad Successfully !"}) ;
    }
})

const updateEnrolledCourseMarks = catchAsync(async (req , res) => {
    const result = await enrolledCourseSerivces.updateEnrolledCourseMarksIntoDb(req.user?.userId , req.body) ;
    if(result){
        sendResponse
        <object>(res , {data : result , statusCode : 200 , success : true , message : "Enrolled Course Updated Successfully !"}) ;
    }
})

const getMyEnrolledCourses = catchAsync(async (req , res) => {
    const result = await enrolledCourseSerivces.getMyEnrolledCoursesFromDb(req.user?.userId , req.query) ;
    if(result){
        sendResponse
        <object>(res , { meta : result?.meta , data : result.result , statusCode : 200 , success : true , message : "Enrolled Course Retrived Successfully !"}) ;
    }
})

export const enrolledCourseControllers = {
    createEnrolledCourse ,
    getMyEnrolledCourses ,
    updateEnrolledCourseMarks ,
}
