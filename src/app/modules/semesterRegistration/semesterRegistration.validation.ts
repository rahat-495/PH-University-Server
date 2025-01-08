
import { z } from "zod";
import { semesterRegistrationStatus } from "./semesterRegistration.constant";

const createSemesterRegistrationValidationSchema = z.object({
    body : z.object({
        academicSemester : z.string() ,
        status : z.enum([...semesterRegistrationStatus] as [string]) ,
        startDate : z.string().datetime() ,
        endDate : z.string().datetime() ,
        minCredit : z.number() ,
        maxCredit : z.number() ,
    }),
})

const updateSemesterRegistrationValidationSchema = z.object({
    body : z.object({
        
    }),
})

export const semesterRegistrationValidations = {
    createSemesterRegistrationValidationSchema ,
    updateSemesterRegistrationValidationSchema ,
}
