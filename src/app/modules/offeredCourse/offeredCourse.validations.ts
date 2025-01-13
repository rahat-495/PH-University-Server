
import { z } from "zod" ;
import { Days } from "./offeredCourse.constants";

const createOfferedCourseValidation = z.object({
    body : z.object({
        semesterRegistration : z.string() ,
        academicSemester : z.string() ,
        academicFaculty : z.string() ,
        academicDepartment : z.string() ,
        course : z.string() ,
        faculty : z.string() ,
        maxCapacity : z.number() ,
        section : z.number() ,
        days : z.enum([...Days] as [string]) ,
        startTime : z.string() ,
        endTime : z.string() ,
    })
});

const updateOfferedCourseValidation = z.object({
    body : z.object({
        faculty : z.string().optional() ,
        maxCapacity : z.number().optional() ,
        startTime : z.string().optional() ,
        endTime : z.string().optional() ,
    })
});

export const offeredCourseValidations = {
    createOfferedCourseValidation ,
    updateOfferedCourseValidation ,
}
