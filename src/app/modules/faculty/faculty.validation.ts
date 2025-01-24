
import { z } from "zod";

const createUserNameValidationSchema = z.object({
    firstName : z.string().max(20).min(1).refine((value) => /^[A-Z]/.test(value) , {message : "first name start with capital letter !"}) ,
    middleName : z.string() ,
    lastName : z.string() ,
})

const createFacultyValidationSchema = z.object({
    body : z.object({
        password : z.string().max(20) ,
        faculty : z.object({
            name : createUserNameValidationSchema ,
            gender : z.enum(["male" , "female" , "other"]) ,
            dateOfBirth : z.string() ,
            email : z.string().email() ,
            contactNo : z.string() ,
            emergencyContactNo : z.string() ,
            presentAddress : z.string() ,
            permanentAddress : z.string() ,
            profileImg : z.string() ,
            isActive : z.enum(["active" , "blocked"]).default("active") ,
            isDeleted : z.boolean().optional() ,
            academicDepartment : z.string() ,
            academicFaculty : z.string() ,
            designation : z.string() ,
        })
    }),
})

const updateUserNameValidationSchema = z.object({
    firstName : z.string().max(20).min(1).refine((value) => /^[A-Z]/.test(value) , {message : "first name start with capital letter !"}).optional() ,
    middleName : z.string().optional() ,
    lastName : z.string().optional() ,
})

const updateFacultyValidationSchema = z.object({
    body : z.object({
        faculty : z.object({
            name : updateUserNameValidationSchema.optional() ,
            gender : z.enum(["male" , "female" , "other"]).optional() ,
            dateOfBirth : z.string().optional() ,
            email : z.string().email().optional() ,
            contactNo : z.string().optional() ,
            emergencyContactNo : z.string().optional() ,
            presentAddress : z.string().optional() ,
            permanentAddress : z.string().optional() ,
            profileImg : z.string().optional() ,
            isActive : z.enum(["active" , "blocked"]).default("active").optional() ,
            isDeleted : z.boolean().optional().optional() ,
            academicDepartment : z.string().optional() ,
            academicFaculty : z.string().optional() ,
            designation : z.string().optional() ,
        })
    }),
})

export const facultyValidations = {
    createFacultyValidationSchema ,
    updateFacultyValidationSchema ,
}
