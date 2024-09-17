import { Router } from "express";
import { uploadVideo } from '../../controllers/file.controller';
import { upload } from '../../middlewares/multer';
const router = Router();

router.post('/upload/image', upload.single('image'), uploadVideo);

export default router;