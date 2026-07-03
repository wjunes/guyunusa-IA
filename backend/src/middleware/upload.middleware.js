/**
 * upload.middleware.js — Configuración de multer para avatares
 */
import multer from 'multer';
import { tmpdir } from 'os';
import { join }   from 'path';

const MAX_SIZE = 2 * 1024 * 1024; // 2 MB

const upload = multer({
  dest: tmpdir(), // archivos temporales en /tmp
  limits: { fileSize: MAX_SIZE, files: 1 },
  fileFilter: (_req, file, cb) => {
    if (['image/jpeg', 'image/jpg', 'image/png'].includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten imágenes JPG y PNG'));
    }
  },
});

export const uploadAvatar = upload.single('avatar');
