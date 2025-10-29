import express from 'express';
import { getLivestreams, getCurrentLivestream, createLivestream, updateLivestream, endLivestream, getChatMessages, sendChatMessage } from '../controllers/livestreamController.js';

const router = express.Router();

router.get('/', getLivestreams);
router.get('/current', getCurrentLivestream);
router.post('/', createLivestream);
router.put('/:id', updateLivestream);
router.post('/:id/end', endLivestream);
router.get('/:id/chat', getChatMessages);
router.post('/:id/chat', sendChatMessage);

export default router;
