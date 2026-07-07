import {Router, type NextFunction, type Request, type Response} from 'express';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import {randomUUID} from 'crypto';
import multer from 'multer';
import {requireSession} from '../middleware/requireSession.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UPLOAD_DIR = path.resolve(__dirname, '../../uploads');
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_MIME_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, {recursive: true});
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase() || '.jpg';
    cb(null, `${randomUUID()}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: {fileSize: MAX_FILE_SIZE},
  fileFilter: (_req, file, cb) => {
    if (ALLOWED_MIME_TYPES.has(file.mimetype)) {
      cb(null, true);
      return;
    }
    cb(new Error('Only JPEG, PNG, and WebP images are allowed'));
  },
});

export const uploadRouter = Router();

uploadRouter.use(requireSession);

uploadRouter.post('/', upload.single('image'), (req, res) => {
  if (!req.file) {
    res.status(400).json({error: 'No image file provided'});
    return;
  }

  res.json({url: `/uploads/${req.file.filename}`});
});

uploadRouter.use((err: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      res.status(400).json({error: 'Image must be 5MB or smaller'});
      return;
    }
    res.status(400).json({error: err.message});
    return;
  }
  if (err instanceof Error) {
    res.status(400).json({error: err.message});
    return;
  }
  next(err);
});
