import express from 'express';
import { getProfile, updateProfile, changePassword } from '../controllers/profileController.js';

const router = express.Router();

router.get('/:userId', getProfile);
router.put('/:userId', updateProfile);
router.post('/:userId/change-password', changePassword);

export default router;
