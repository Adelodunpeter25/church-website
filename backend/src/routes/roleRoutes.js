import express from 'express';
import { getRoles, getRole, createRole, updateRole, deleteRole, getPermissions, getRolePermissions } from '../controllers/roleController.js';

const router = express.Router();

router.get('/', getRoles);
router.get('/permissions', getPermissions);
router.get('/:role/permissions', getRolePermissions);
router.get('/:id', getRole);
router.post('/', createRole);
router.put('/:id', updateRole);
router.delete('/:id', deleteRole);

export default router;
