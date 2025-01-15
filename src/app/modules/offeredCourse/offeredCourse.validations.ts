
import { z } from "zod" ;
import { Days } from "./offeredCourse.constants";

const createOfferedCourseValidation = z.object({
    body : z.object({
        semesterRegistration : z.string() ,
        academicFaculty : z.string() ,
        academicDepartment : z.string() ,
        course : z.string() ,
        faculty : z.string() ,
        maxCapacity : z.number() ,
        section : z.number() ,
        days : z.array(z.enum([...Days] as [string])) ,
        startTime : z.string().refine((time) => {
            const regex = /^(?:[01]\d|2[0-3])\s*:\s*[0-5]\d$/ ;
            return regex.test(time) ;
        },{ 
            message : "Invalid Time Format Expected 'HH:MM' !" ,
        }) ,
        endTime : z.string().refine((time) => {
            const regex = /^(?:[01]\d|2[0-3])\s*:\s*[0-5]\d$/ ;
            return regex.test(time) ;
        },{ 
            message : "Invalid Time Format Expected 'HH:MM' !"
        }) ,
    }).refine((body) => {
        const start = new Date(`2007-03-05T${body.startTime}:00`) ;
        const end = new Date(`2007-03-05T${body.endTime}:00`) ;
        return end > start ;
    },{
        message : `Start time should be before End Time !`
    })
});

const updateOfferedCourseValidation = z.object({
    body : z.object({
        faculty : z.string().optional() ,
        days : z.enum([...Days] as [string]).optional() ,
        maxCapacity : z.number().optional() ,
        startTime : z.string().optional() ,
        endTime : z.string().optional() ,
    })
});

export const offeredCourseValidations = {
    createOfferedCourseValidation ,
    updateOfferedCourseValidation ,
}
