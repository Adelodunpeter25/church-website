import express from 'express';
import { getEvents, getEvent, createEvent, updateEvent, deleteEvent, registerForEvent, unregisterFromEvent, getEventAttendees, markAttendance, getMemberEvents } from '../controllers/eventController.js';

const router = express.Router();

router.get('/', getEvents);
router.get('/member/:memberId', getMemberEvents);
router.get('/:id', getEvent);
router.post('/', createEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);
router.post('/:id/register', registerForEvent);
router.delete('/:id/register/:memberId', unregisterFromEvent);
router.get('/:id/attendees', getEventAttendees);
router.put('/:id/attendance/:memberId', markAttendance);

export default router;
