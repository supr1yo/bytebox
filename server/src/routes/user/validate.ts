import { Router } from 'express';
import validateUser from '../../controllers/validate.controller';
import authenticate from '../../middlewares/auth';
const router = Router();

router.post('/auth/validate', authenticate, validateUser);


export default router;