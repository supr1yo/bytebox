import { createUser } from '../../controllers/user.controller';
import { Router } from "express";
import authenticate from '../../middlewares/auth';
const router = Router();

router.post('/auth/signup', authenticate, createUser);

export default router;