import express from 'express';
import { getMemberGiving, createGiving, getMemberGivingSummary } from '../controllers/givingController.js';

const router = express.Router();

/**
 * @swagger
 * /giving/member/{memberId}:
 *   get:
 *     summary: Get member giving history
 *     tags: [Giving]
 *     parameters:
 *       - in: path
 *         name: memberId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Giving history retrieved
 */

/**
 * @swagger
 * /giving/member/{memberId}/summary:
 *   get:
 *     summary: Get member giving summary
 *     tags: [Giving]
 *     parameters:
 *       - in: path
 *         name: memberId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Giving summary retrieved
 */

/**
 * @swagger
 * /giving:
 *   post:
 *     summary: Record giving
 *     tags: [Giving]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - member_id
 *               - amount
 *               - type
 *             properties:
 *               member_id:
 *                 type: integer
 *               amount:
 *                 type: number
 *               type:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Giving recorded
 */

router.get('/member/:memberId', getMemberGiving);
router.get('/member/:memberId/summary', getMemberGivingSummary);
router.post('/', createGiving);

export default router;
