import { Router } from 'express';
import { upload } from '../../middlewares/multer';
import { uploadFile } from "../../controllers/file.controller";

const router = Router();

router.post('/upload', upload.single('file'), uploadFile);

export default router;