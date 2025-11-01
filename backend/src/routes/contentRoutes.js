import express from 'express';
import { getContent, getContentByKey, updateContent, getServiceTimes, createServiceTime, updateServiceTime, deleteServiceTime } from '../controllers/contentController.js';
import { validateContent, validateServiceTime } from '../middleware/validation.js';

const router = express.Router();

router.get('/', getContent);
router.get('/service-times', getServiceTimes);
router.post('/service-times', validateServiceTime, createServiceTime);
router.put('/service-times/:id', validateServiceTime, updateServiceTime);
router.delete('/service-times/:id', deleteServiceTime);
router.get('/:key', getContentByKey);
router.put('/:key', validateContent, updateContent);

export default router;
