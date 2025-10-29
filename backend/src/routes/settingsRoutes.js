import express from 'express';
import { getSettings, getSettingByKey, updateSetting } from '../controllers/settingsController.js';

const router = express.Router();

router.get('/', getSettings);
router.get('/:key', getSettingByKey);
router.put('/:key', updateSetting);

export default router;
