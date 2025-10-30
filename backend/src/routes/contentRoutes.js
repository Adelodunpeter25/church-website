import express from 'express';
import { getContent, getContentByKey, updateContent, getServiceTimes, createServiceTime, updateServiceTime, deleteServiceTime } from '../controllers/contentController.js';

const router = express.Router();

router.get('/', getContent);
router.get('/service-times', getServiceTimes);
router.post('/service-times', createServiceTime);
router.put('/service-times/:id', updateServiceTime);
router.delete('/service-times/:id', deleteServiceTime);
router.get('/:key', getContentByKey);
router.put('/:key', updateContent);

export default router;
