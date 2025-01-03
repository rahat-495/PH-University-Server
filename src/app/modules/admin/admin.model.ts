
import { model, Schema, Types } from "mongoose";
import AppError from "../../errors/AppErrors";
import { TAdmin, TAdminName } from "./admin.interfaces";

const nameSchema = new Schema<TAdminName>({
    firstName: {
        type: String,
        required: [true, "First name is required!"],
    },
    middleName: {
        type: String,
        required: false,
    },
    lastName: {
        type: String,
        required: [true, "Last name is required!"],
    },    
})

const adminSchema = new Schema<TAdmin>({
    id : {
        type : String ,
        unique : true ,
        required : [true , "ID is required !"] ,
    },
    user : {
        ref : 'user' ,
        unique : true ,
        type : Schema.Types.ObjectId ,
        required : [true , "User Id is required !"] ,
    },
    name : {
        type : nameSchema ,
        required : [true , "Name is required !"] ,
    },
    isDeleted : {
        type : Boolean ,
        default : false ,
    },
    profileImage : {
        type : String ,
    },
    permanentAddress : {
        type : String ,
        required : [true , "Permanent address is required !"] ,
    },
    presentAddress : {
        type : String ,
        required : [true , "Present address is required !"] ,
    },
    contactNo : {
        type : String ,
        required : [true , "contact No is required !"] ,
    },
    emergencyContactNo : {
        type : String ,
        required : [true , "emergency Contact No is required !"] ,
    },
    email : {
        type : String ,
        unique : true ,
        required : [true , "email is required !"] ,
    },
    dateOfBirth : {
        type : String ,
        required : [true , "date Of Birth is required !"] ,
    },
    designation : {
        type : String ,
        required : [true , "designation is required !"] ,
    },
    gender : {
        type : String ,
        enum : ["male" , "female" , "other"] ,
        required : [true , "gender is required !"] ,
    },
    managementDepartment : {
        type : Types.ObjectId ,
        ref : "managementDepartment" ,
        required : [true , "management department is required !"] ,
    }
});

// --- managementDepartment validation -----------------------------------------------------
// adminSchema.pre("save" , async function(next){
//     const faculty = this ;
//     const academicDepartment = await academicDepartmentsModel.findOne({_id : faculty.academicDepartment}) ;
//     if(!academicDepartment){
//         throw new AppError(404 , "Academic department not found !") ;
//     }
//     const academicFaculty = await academicFacultysModel.findOne({_id : faculty.academicFaculty}) ;
//     if(!academicFaculty){
//         throw new AppError(404 , "Academic faculty not found !") ;
//     }
//     next() ;
// })

adminSchema.pre("find", async function(next){
    this.find({isDeleted : {$ne : true}}) ;
    next() ;
});

adminSchema.pre("findOne", async function(next){
    this.findOne({isDeleted : {$ne : true}}) ;
    next() ;
});

adminSchema.pre('findOneAndUpdate', async function(next) {
    const admin = await adminsModel.findOne(this.getQuery().id) ;
    if (!admin) {
        throw new AppError(404, "admin not found!");
    }
    next();
});

export const adminsModel = model('admin' , adminSchema) ;
