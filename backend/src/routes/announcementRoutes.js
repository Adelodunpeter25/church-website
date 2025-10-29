import express from 'express';
import { getAnnouncements, getAnnouncement, createAnnouncement, updateAnnouncement, deleteAnnouncement } from '../controllers/announcementController.js';

const router = express.Router();

router.get('/', getAnnouncements);
router.get('/:id', getAnnouncement);
router.post('/', createAnnouncement);
router.put('/:id', updateAnnouncement);
router.delete('/:id', deleteAnnouncement);

export default router;
