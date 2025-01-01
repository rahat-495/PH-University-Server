
import express from "express"
import validateRequest from "../middlewares/validateRequest";
import { adminControllers } from "./admin.controllers";

const router = express.Router() ;

router.get('/' , adminControllers.getAllAdmin) ;
router.get('/:adminId' , adminControllers.getSpecifiAdmin) ;
router.patch('/:adminId' , adminControllers.updateAdmin) ;
router.delete('/:adminId' , adminControllers.deleteAdmin) ;

export const adminRoutes = router ;
