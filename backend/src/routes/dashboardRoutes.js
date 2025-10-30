import express from 'express';
import { getDashboardStats, getRecentActivity, getMemberStats, getMemberRecentSermons, getMemberUpcomingEvents } from '../controllers/dashboardController.js';

const router = express.Router();

router.get('/stats', getDashboardStats);
router.get('/activity', getRecentActivity);
router.get('/member/:memberId/stats', getMemberStats);
router.get('/member/:memberId/recent-sermons', getMemberRecentSermons);
router.get('/member/:memberId/upcoming-events', getMemberUpcomingEvents);

export default router;
