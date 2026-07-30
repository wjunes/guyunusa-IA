import { Router } from 'express';
import {
  sendMessage, sendMessageStream,
  getConversations, getMessages, deleteConversation,
  processFileUpload, getQuota,
} from '../controllers/chat.controller.js';
import { requireAuth }    from '../middleware/auth.middleware.js';
import { uploadChatFile } from '../middleware/upload.middleware.js';

const router = Router();

router.use(requireAuth);

router.post('/message',             sendMessage);
router.post('/stream',              sendMessageStream);
router.post('/file',                uploadChatFile, processFileUpload);
router.get('/quota',                getQuota);
router.get('/conversations',        getConversations);
router.get('/conversations/:id',    getMessages);
router.delete('/conversations/:id', deleteConversation);

export default router;
