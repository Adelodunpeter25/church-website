import express from 'express';
import { getUsers, getUser, createUser, updateUser, deleteUser, resetPassword, getUserStats } from '../controllers/userController.js';

const router = express.Router();

router.get('/stats', getUserStats);
router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/:id/reset-password', resetPassword);

export default router;
