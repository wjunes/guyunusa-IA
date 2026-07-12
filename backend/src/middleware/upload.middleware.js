/**
 * upload.middleware.js — Multer para avatares y archivos de chat
 */
import multer from 'multer';
import { tmpdir } from 'os';

const MAX_AVATAR   = 2  * 1024 * 1024; // 2 MB
const MAX_CHATFILE = 10 * 1024 * 1024; // 10 MB

/* ── Avatares: solo imágenes JPG/PNG ── */
const avatar = multer({
  dest: tmpdir(),
  limits: { fileSize: MAX_AVATAR, files: 1 },
  fileFilter: (_req, file, cb) => {
    if (['image/jpeg', 'image/jpg', 'image/png'].includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten imágenes JPG y PNG'));
    }
  },
});

/* ── Archivos de chat: texto, código, PDF, DOCX ── */
const chatFile = multer({
  dest: tmpdir(),
  limits: { fileSize: MAX_CHATFILE, files: 1 },
  fileFilter: (_req, file, cb) => {
    const mime = file.mimetype?.toLowerCase() || '';
    const name = file.originalname?.toLowerCase() || '';

    // Tipos explícitamente rechazados (binarios, ejecutables, etc.)
    const blocked = [
      'application/x-msdownload', 'application/x-executable',
      'application/x-dosexec', 'application/x-elf',
      'video/', 'audio/', 'image/',
    ];
    if (blocked.some(b => mime.startsWith(b))) {
      return cb(new Error(`Tipo de archivo no soportado: ${file.originalname}`));
    }

    // Extensiones de archivos binarios comunes a rechazar
    const blockedExts = ['.exe', '.dll', '.so', '.dylib', '.bin', '.zip', '.tar',
                         '.gz', '.rar', '.7z', '.mp3', '.mp4', '.avi', '.mov',
                         '.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg',
                         '.woff', '.woff2', '.ttf', '.otf'];
    if (blockedExts.some(ext => name.endsWith(ext))) {
      return cb(new Error(`Tipo de archivo no soportado: ${file.originalname}`));
    }

    cb(null, true);
  },
});

export const uploadAvatar   = avatar.single('avatar');
export const uploadChatFile = chatFile.single('file');
