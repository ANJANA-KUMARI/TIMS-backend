import multer from 'multer';
import config from '../../config';

const storage = multer.diskStorage({
  destination: config.app.studyMaterialUploadPath,
  filename: (req, file, next) => {
    next(null, ` sm_${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

export default upload;
