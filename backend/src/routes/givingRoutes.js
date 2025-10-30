import express from 'express';
import { getMemberGiving, createGiving, getMemberGivingSummary } from '../controllers/givingController.js';

const router = express.Router();

router.get('/member/:memberId', getMemberGiving);
router.get('/member/:memberId/summary', getMemberGivingSummary);
router.post('/', createGiving);

export default router;
