
import { RequestHandler } from "express";
import { courseServices } from "./course.services";
import sendResponse from "../../utils/sendResponse";

const createCourse : RequestHandler = async (req , res) => {
    const result = await courseServices.createCourseIntoDb(req.body) ;
    sendResponse<object>(res , {data : result , statusCode : 200 , success : true , message : "Course Created Successfully !"}) ;
}

const courseControllers = {
    createCourse ,
}
