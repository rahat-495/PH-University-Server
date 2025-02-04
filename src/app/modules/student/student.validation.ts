
import { z } from "zod";

const createUserNameValidationSchema = z.object({
    firstName : z.string().max(20).min(1).refine((value) => /^[A-Z]/.test(value) , {message : "first name start with capital letter !"}) ,
    middleName : z.string() ,
    lastName : z.string() ,
})

const createGuardianValidationSchema = z.object({
    fatherName : z.string() ,
    fatherOccupation : z.string() ,
    fatherContactNo : z.string() ,
    motherName : z.string() ,
    motherOccupation : z.string() ,
    motherContactNo : z.string() ,
})

const createLocalGuardianValidationSchema = z.object({
    name : z.string() ,
    occupation : z.string() ,
    contactNo : z.string() ,
    address : z.string() ,
})

const createStudentValidationSchema = z.object({
    body : z.object({
        password : z.string().max(20).optional() ,
        student : z.object({
            name : createUserNameValidationSchema ,
            gender : z.enum(["male" , "female" , "other"]) ,
            dateOfBirth : z.string() ,
            email : z.string().email() ,
            contactNo : z.string() ,
            emergencyContactNo : z.string() ,
            presentAddress : z.string() ,
            permanentAddress : z.string() ,
            guardian : createGuardianValidationSchema ,
            localGuardian : createLocalGuardianValidationSchema ,
            profileImg : z.string() ,
            isActive : z.enum(["active" , "blocked"]).default("active") ,
            isDeleted : z.boolean().optional() ,
            admissionSemester : z.string() ,
            academicDepartment : z.string() ,
        })
    }),
})

const updateUserNameValidationSchema = z.object({
    firstName : z.string().max(20).min(1).refine((value) => /^[A-Z]/.test(value) , {message : "first name start with capital letter !"}).optional() ,
    middleName : z.string().optional() ,
    lastName : z.string().optional() ,
})

const updateGuardianValidationSchema = z.object({
    fatherName : z.string().optional() ,
    fatherOccupation : z.string().optional() ,
    fatherContactNo : z.string().optional() ,
    motherName : z.string().optional() ,
    motherOccupation : z.string().optional() ,
    motherContactNo : z.string().optional() ,
})

const updateLocalGuardianValidationSchema = z.object({
    name : z.string().optional() ,
    occupation : z.string().optional() ,
    contactNo : z.string().optional() ,
    address : z.string().optional() ,
})

const updateStudentValidationSchema = z.object({
    body : z.object({
        student : z.object({
            name : updateUserNameValidationSchema.optional() ,
            gender : z.enum(["male" , "female" , "other"]).optional() ,
            dateOfBirth : z.string().optional() ,
            email : z.string().email().optional() ,
            contactNo : z.string().optional() ,
            emergencyContactNo : z.string().optional() ,
            presentAddress : z.string().optional() ,
            permanentAddress : z.string().optional() ,
            guardian : updateGuardianValidationSchema.optional() ,
            localGuardian : updateLocalGuardianValidationSchema.optional() ,
            profileImg : z.string().optional() ,
            isActive : z.enum(["active" , "blocked"]).default("active").optional() ,
            isDeleted : z.boolean().optional().optional() ,
            admissionSemester : z.string().optional() ,
            academicDepartment : z.string().optional() ,
        })
    }),
})

export const studentValidations = {
    createStudentValidationSchema ,
    updateStudentValidationSchema ,
}
