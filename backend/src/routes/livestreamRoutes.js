import express from 'express';
import { getLivestreams, getCurrentLivestream, createLivestream, updateLivestream, endLivestream, getChatMessages, sendChatMessage, updateViewerCount, getStreamHistory } from '../controllers/livestreamController.js';

const router = express.Router();

router.get('/', getLivestreams);
router.get('/current', getCurrentLivestream);
router.get('/history', getStreamHistory);
router.post('/', createLivestream);
router.put('/:id', updateLivestream);
router.post('/:id/end', endLivestream);
router.put('/:id/viewers', updateViewerCount);
router.get('/:id/chat', getChatMessages);
router.post('/:id/chat', sendChatMessage);

export default router;
