import { register } from '../../controllers/user.controller';
import { Router } from "express";
const router = Router();

router.post('/auth/signup', register);

export default router;