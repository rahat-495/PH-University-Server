
import { Router } from "express";
import validateRequest from "../middlewares/validateRequest";
import { authValidations } from "./auth.validation";
import { authControllers } from "./auth.controllers";

const router = Router() ;

router.post('/login' , validateRequest(authValidations.loginValidationSchema) , authControllers.loginUser) ;
router.post('/change-password' , validateRequest(authValidations.loginValidationSchema) , authControllers.loginUser) ;

export const authRoutes = router ;
