
import {z} from 'zod' ;

const academicFacultyValidationSchema = z.object({
    name : z.string({invalid_type_error : "name must be string !"}) ,
});

export const academicFacultyValidation = {
    academicFacultyValidationSchema ,
}
