import express from 'express';
import { getMembers, getMember, createMember, updateMember, deleteMember, exportMembers } from '../controllers/memberController.js';

const router = express.Router();

router.get('/', getMembers);
router.get('/export', exportMembers);
router.get('/:id', getMember);
router.post('/', createMember);
router.put('/:id', updateMember);
router.delete('/:id', deleteMember);

export default router;
