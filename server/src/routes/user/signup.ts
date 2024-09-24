import { createUser } from '../../controllers/user.controller';
import { Router } from "express";
const router = Router();

router.post('/auth/signup', createUser);

export default router;