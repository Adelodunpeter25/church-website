import express from 'express';
import { getSermons, getSermon, createSermon, updateSermon, deleteSermon, incrementPlays } from '../controllers/sermonController.js';

const router = express.Router();

router.get('/', getSermons);
router.get('/:id', getSermon);
router.post('/', createSermon);
router.put('/:id', updateSermon);
router.delete('/:id', deleteSermon);
router.post('/:id/play', incrementPlays);

export default router;
