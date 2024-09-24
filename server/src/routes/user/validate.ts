import { Router } from 'express';
import validateUser from '../../controllers/validate.controller';
const router = Router();

router.post('/auth/validate', validateUser);


export default router;