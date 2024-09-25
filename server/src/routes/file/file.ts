import { Router } from 'express';
import { upload } from '../../middlewares/multer';
import { uploadFile } from "../../controllers/file.controller";
import authenticate from '../../middlewares/auth';
const router = Router();

router.post('/upload', authenticate, upload.single('file'), uploadFile);

export default router;