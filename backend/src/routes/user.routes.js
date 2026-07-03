import { Router } from 'express';
import { getProfile, updateProfile, deleteAccount,
         uploadAvatar, deleteAvatar } from '../controllers/user.controller.js';
import { uploadAvatar as multerAvatar } from '../middleware/upload.middleware.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const router = Router();

router.use(requireAuth);
router.get('/',    getProfile);
router.put('/',    updateProfile);
router.delete('/', deleteAccount);

// Avatar
router.post('/avatar',   multerAvatar, uploadAvatar);
router.delete('/avatar', deleteAvatar);

export default router;
