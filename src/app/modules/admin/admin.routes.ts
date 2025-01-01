
import express from "express"
import validateRequest from "../middlewares/validateRequest";
import { adminControllers } from "./admin.controllers";
import { adminValidations } from "./admin.validation";

const router = express.Router() ;

router.get('/' , adminControllers.getAllAdmin) ;
router.get('/:adminId' , adminControllers.getSpecifiAdmin) ;
router.patch('/:adminId'  , validateRequest(adminValidations.updateAdminValidationSchema) , adminControllers.updateAdmin) ;
router.delete('/:adminId' , adminControllers.deleteAdmin) ;

export const adminRoutes = router ;
