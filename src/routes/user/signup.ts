import { register } from '../../controllers/user.controller';
import express from "express";
const router = express.Router();

router.post('/auth/signup', register);

export default router;