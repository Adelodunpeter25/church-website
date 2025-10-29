import express from 'express';
import { getContent, getContentByKey, updateContent } from '../controllers/contentController.js';

const router = express.Router();

router.get('/', getContent);
router.get('/:key', getContentByKey);
router.put('/:key', updateContent);

export default router;
