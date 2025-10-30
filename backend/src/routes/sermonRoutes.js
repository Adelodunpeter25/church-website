import express from 'express';
import { getSermons, getSermon, createSermon, updateSermon, deleteSermon, incrementPlays, incrementDownloads } from '../controllers/sermonController.js';
import { uploadSermonFiles } from '../services/storageService.js';

const router = express.Router();

router.get('/', getSermons);
router.get('/:id', getSermon);
router.post('/', uploadSermonFiles, createSermon);
router.put('/:id', updateSermon);
router.delete('/:id', deleteSermon);
router.post('/:id/play', incrementPlays);
router.post('/:id/download', incrementDownloads);

export default router;
