
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { enrolledCourseSerivces } from "./enrolledCourse.services";

const createEnrolledCourse = catchAsync(async (req , res) => {
    const result = await enrolledCourseSerivces.createEnrolledCourseIntoDb(req.body) ;
    if(result){
        sendResponse
        <object>(res , {data : result , statusCode : 200 , success : true , message : "Enrolled Course Creatad Successfully !"}) ;
    }
})

export const enrolledCourseControllers = {
    createEnrolledCourse ,
}
