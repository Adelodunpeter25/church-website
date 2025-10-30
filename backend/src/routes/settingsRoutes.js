import express from 'express';
import { getSettings, getSettingByKey, updateSetting, updateBulkSettings, getSystemStatus, getSecurityLogs, getSecurityStats, getRecentNotifications, getIntegrationStats, getBackupHistory } from '../controllers/settingsController.js';

const router = express.Router();

router.get('/', getSettings);
router.get('/system/status', getSystemStatus);
router.get('/system/backups', getBackupHistory);
router.get('/security/logs', getSecurityLogs);
router.get('/security/stats', getSecurityStats);
router.get('/notifications/recent', getRecentNotifications);
router.get('/integrations/stats', getIntegrationStats);
router.get('/:key', getSettingByKey);
router.put('/:key', updateSetting);
router.post('/bulk', updateBulkSettings);

export default router;
