import express from 'express';
import { getAnnouncements, getAnnouncement, createAnnouncement, updateAnnouncement, deleteAnnouncement, incrementViews } from '../controllers/announcementController.js';

const router = express.Router();

router.get('/', getAnnouncements);
router.get('/:id', getAnnouncement);
router.post('/', createAnnouncement);
router.put('/:id', updateAnnouncement);
router.delete('/:id', deleteAnnouncement);
router.post('/:id/view', incrementViews);

export default router;
