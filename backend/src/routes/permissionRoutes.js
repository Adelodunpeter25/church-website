import express from 'express';
import { getPermissions, getRolePermissions, updateRolePermissions } from '../controllers/permissionController.js';

const router = express.Router();

router.get('/', getPermissions);
router.get('/role/:role', getRolePermissions);
router.put('/role/:role', updateRolePermissions);

export default router;
