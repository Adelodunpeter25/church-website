import express from 'express';
import { getSermons, getSermon, createSermon, updateSermon, deleteSermon, incrementPlays, incrementDownloads } from '../controllers/sermonController.js';

const router = express.Router();

router.get('/', getSermons);
router.get('/:id', getSermon);
router.post('/', createSermon);
router.put('/:id', updateSermon);
router.delete('/:id', deleteSermon);
router.post('/:id/play', incrementPlays);
router.post('/:id/download', incrementDownloads);

export default router;
