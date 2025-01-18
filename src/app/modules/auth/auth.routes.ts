
import { Router } from "express";
import validateRequest from "../middlewares/validateRequest";
import { authValidations } from "./auth.validation";

const router = Router() ;

router.post('/login' , validateRequest(authValidations.loginValidationSchema)) ;

export const authRoutes = router ;
