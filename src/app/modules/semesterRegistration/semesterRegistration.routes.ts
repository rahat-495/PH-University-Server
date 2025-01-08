
import { Router } from "express";

const router = Router() ;

router.get('/') ;
router.get('/:id') ;
router.patch('/:id') ;
router.post('/create-semester-registration') ;

export const semesterRegistrationRoutes = router ;
