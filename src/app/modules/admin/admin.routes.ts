
import express from "express"
import validateRequest from "../middlewares/validateRequest";
import { adminControllers } from "./admin.controllers";
import { adminValidations } from "./admin.validation";

const router = express.Router() ;

router.get('/' , adminControllers.getAllAdmin) ;
router.get('/:id' , adminControllers.getSpecifiAdmin) ;
router.patch('/:id'  , validateRequest(adminValidations.updateAdminValidationSchema) , adminControllers.updateAdmin) ;
router.delete('/:id' , adminControllers.deleteAdmin) ;

export const adminRoutes = router ;
