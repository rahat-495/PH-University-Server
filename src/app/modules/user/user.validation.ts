
import {string, z} from 'zod' ;
import { userStatus } from './user.constant';

const userValidationSchema = z.object({
    password : z.string({invalid_type_error : "password must be string !"}).max(20 , {message : "password can't be more then 20 charecters !"}).optional() ,
});

const changeStatusValidationSchema = z.object({
    body : z.object({
        status : z.enum([...userStatus] as [string]) ,
    }) ,
});

export const userValidation = {
    userValidationSchema ,
    changeStatusValidationSchema ,
}
