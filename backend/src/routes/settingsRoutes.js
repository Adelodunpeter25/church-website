import express from 'express';
import { getSettings, getSettingByKey, updateSetting, updateBulkSettings } from '../controllers/settingsController.js';

const router = express.Router();

router.get('/', getSettings);
router.get('/:key', getSettingByKey);
router.put('/:key', updateSetting);
router.post('/bulk', updateBulkSettings);

export default router;
