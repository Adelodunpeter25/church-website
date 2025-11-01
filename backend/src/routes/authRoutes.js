import express from 'express';
import { register, login, verifyToken, getLoginHistory, logoutAll } from '../controllers/authController.js';
import { validateLogin, validateRegister, validateUserId } from '../middleware/validation.js';

const router = express.Router();

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.get('/verify', verifyToken);
router.get('/login-history/:userId', validateUserId, getLoginHistory);
router.post('/logout-all/:userId', validateUserId, logoutAll);

export default router;
