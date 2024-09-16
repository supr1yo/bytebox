import { login } from 'controllers/user.controller';
import { Router } from 'express';

const router = Router();

router.post('/auth/login', login);

export default router;