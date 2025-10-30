import express from 'express';
import { getPrayerRequests, getPrayerRequest, createPrayerRequest, updatePrayerRequest, deletePrayerRequest, getMemberPrayerRequests, prayForRequest } from '../controllers/prayerController.js';

const router = express.Router();

router.get('/', getPrayerRequests);
router.get('/member/:memberId', getMemberPrayerRequests);
router.get('/:id', getPrayerRequest);
router.post('/', createPrayerRequest);
router.put('/:id', updatePrayerRequest);
router.delete('/:id', deletePrayerRequest);
router.post('/:id/pray', prayForRequest);

export default router;
