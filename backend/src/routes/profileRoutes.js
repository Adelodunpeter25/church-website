import express from 'express';
import { getProfile, updateProfile, deleteProfile, changePassword, uploadProfilePhoto, getNotificationPreferences, updateNotificationPreferences } from '../controllers/profileController.js';
import { validateUserId, validateUpdateUser, validatePasswordChange } from '../middleware/validation.js';

const router = express.Router();

router.get('/:userId', validateUserId, getProfile);
router.put('/:userId', validateUserId, validateUpdateUser, updateProfile);
router.delete('/:userId', validateUserId, deleteProfile);
router.post('/:userId/change-password', validateUserId, validatePasswordChange, changePassword);
router.post('/:userId/photo', uploadProfilePhoto);
router.get('/:userId/notifications', validateUserId, getNotificationPreferences);
router.put('/:userId/notifications', validateUserId, updateNotificationPreferences);

export default router;
