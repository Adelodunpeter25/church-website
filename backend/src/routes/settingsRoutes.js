import express from 'express';
import { getSettings, getSettingByKey, updateSetting, updateBulkSettings, getSystemStatus, getSecurityStats, getRecentNotifications, getIntegrationStats, testIntegration, testEmail } from '../controllers/settingsController.js';

const router = express.Router();

router.get('/', getSettings);
router.get('/system/status', getSystemStatus);
router.get('/security/stats', getSecurityStats);
router.get('/notifications/recent', getRecentNotifications);
router.post('/notifications/test-email', testEmail);
router.get('/integrations/stats', getIntegrationStats);
router.post('/integrations/:integration/test', testIntegration);
router.get('/:key', getSettingByKey);
router.put('/:key', updateSetting);
router.post('/bulk', updateBulkSettings);

export default router;
