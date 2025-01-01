
import { RequestHandler } from "express"
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { adminServices } from "./admin.services";

const getAllAdmin : RequestHandler = catchAsync(async (req , res , next) => {
    const result = await adminServices.getAllAdminFromDb(req.query) ;
    sendResponse<object>(res , {data : result , statusCode : 200 , success : true , message : "All admin are retrived !"}) ;
}) ;

const getSpecifiAdmin : RequestHandler = catchAsync(async (req , res , next) => {
    const {adminId} = req.params ;
    const data = await adminServices.getSpecificAdminFromDb(adminId) ;
    if(data){
        sendResponse<object>(res , {data , statusCode : 200 , success : true , message : "Specific admin are retrived !"}) ;
    }
    else{
        sendResponse<object>(res , {data : {} , statusCode : 200 , success : true , message : "Can't Get Any admin !"}) ;
    }
}) ;

const updateAdmin : RequestHandler = catchAsync(async (req , res , next) => {
    const {adminId} = req.params ;
    const result = await adminServices.updateSingleAdminIntoDb(adminId , req.body.admin) ;
    if(result){
        sendResponse<object>(res , {data : result , statusCode : 200 , success : true , message : "admin details udpated success fully !"}) ;
    }
}) ;

const deleteAdmin : RequestHandler = catchAsync(async (req , res , next) => {
    const {adminId} = req.params ;
    const result = await adminServices.deleteSingleAdminFromDb(adminId) ;
    if(result){
        sendResponse<object>(res , {data : result , statusCode : 200 , success : true , message : "Specific admin are deleted !"}) ;
    }
}) ;

export const adminControllers = {
    getAllAdmin,
    deleteAdmin ,
    updateAdmin ,
    getSpecifiAdmin ,
}
