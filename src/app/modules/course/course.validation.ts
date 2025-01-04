
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

const updateCourseValidation = createCourseValidation.optional() ;

export const courseValidations = {
    createCourseValidation ,
    updateCourseValidation ,
}
