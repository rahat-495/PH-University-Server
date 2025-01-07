
import { z } from "zod";

const preRequisiteCoursevalidationSchema = z.object({
    course : z.string() ,
    isDeleted : z.boolean().optional() ,
})

const createCourseValidation = z.object({
    body : z.object({
        title : z.string() ,
        prefix : z.string() ,
        code : z.number() ,
        credits : z.number() , 
        preRequisiteCourses : z.array(preRequisiteCoursevalidationSchema).optional() ,
        isdeleted : z.boolean().optional() ,
    })
})

const updateCourseValidation = z.object({
    body : z.object({
        title : z.string().optional() ,
        prefix : z.string().optional() ,
        code : z.number().optional() ,
        credits : z.number().optional() , 
        preRequisiteCourses : z.array(preRequisiteCoursevalidationSchema).optional() ,
        isdeleted : z.boolean().optional() ,
    })
});

const assignFacultyWithCourseValidationSchema = z.object({
    body : z.object({
        faculties : z.array(z.string()) ,
    })
})

export const courseValidations = {
    createCourseValidation ,
    updateCourseValidation ,
    assignFacultyWithCourseValidationSchema ,
}
