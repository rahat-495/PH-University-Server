
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
        password : z.string().max(20) ,
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
    firstName : z.string().max(20).min(1).refine((value) => /^[A-Z]/.test(value) , {message : "first name start with capital letter !"}) ,
    middleName : z.string() ,
    lastName : z.string() ,
})

const updateGuardianValidationSchema = z.object({
    fatherName : z.string() ,
    fatherOccupation : z.string() ,
    fatherContactNo : z.string() ,
    motherName : z.string() ,
    motherOccupation : z.string() ,
    motherContactNo : z.string() ,
})

const updateLocalGuardianValidationSchema = z.object({
    name : z.string() ,
    occupation : z.string() ,
    contactNo : z.string() ,
    address : z.string() ,
})

const updateStudentValidationSchema = z.object({
    body : z.object({
        password : z.string().max(20) ,
        student : z.object({
            name : updateUserNameValidationSchema ,
            gender : z.enum(["male" , "female" , "other"]) ,
            dateOfBirth : z.string() ,
            email : z.string().email() ,
            contactNo : z.string() ,
            emergencyContactNo : z.string() ,
            presentAddress : z.string() ,
            permanentAddress : z.string() ,
            guardian : updateGuardianValidationSchema ,
            localGuardian : updateLocalGuardianValidationSchema ,
            profileImg : z.string() ,
            isActive : z.enum(["active" , "blocked"]).default("active") ,
            isDeleted : z.boolean().optional() ,
            admissionSemester : z.string() ,
            academicDepartment : z.string() ,
        })
    }),
})

export const studentValidations = {
    createStudentValidationSchema ,
    updateStudentValidationSchema ,
}
