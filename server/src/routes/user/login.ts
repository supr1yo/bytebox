import { login } from '../../controllers/user.controller';
import { Router } from 'express';
import authenticate from '../../middlewares/auth';
const router = Router();

router.post('/auth/login',authenticate, login);

export default router;