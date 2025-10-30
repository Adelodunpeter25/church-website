import express from 'express';
import { getProfile, updateProfile, deleteProfile, changePassword, uploadProfilePhoto, getNotificationPreferences, updateNotificationPreferences } from '../controllers/profileController.js';

const router = express.Router();

router.get('/:userId', getProfile);
router.put('/:userId', updateProfile);
router.delete('/:userId', deleteProfile);
router.post('/:userId/change-password', changePassword);
router.post('/:userId/photo', uploadProfilePhoto);
router.get('/:userId/notifications', getNotificationPreferences);
router.put('/:userId/notifications', updateNotificationPreferences);

export default router;
