import express from 'express';
import { getLivestreams, getCurrentLivestream, createLivestream, updateLivestream, endLivestream, getChatMessages, sendChatMessage, updateViewerCount, getStreamHistory, getViewers, addViewer, removeViewer, banViewer, unbanViewer, getStreamStats } from '../controllers/livestreamController.js';

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
router.get('/:id/viewers', getViewers);
router.post('/:id/viewers', addViewer);
router.delete('/:id/viewers/:viewerId', removeViewer);
router.post('/:id/viewers/:viewerId/ban', banViewer);
router.post('/:id/viewers/:viewerId/unban', unbanViewer);
router.get('/:id/stats', getStreamStats);

export default router;
