import express from 'express';
import { getPlaylists, getPlaylist, createPlaylist, updatePlaylist, deletePlaylist, addSermonToPlaylist, removeSermonFromPlaylist, incrementPlays, toggleSermonBookmark } from '../controllers/playlistController.js';

const router = express.Router();

router.get('/', getPlaylists);
router.get('/:id', getPlaylist);
router.post('/', createPlaylist);
router.put('/:id', updatePlaylist);
router.delete('/:id', deletePlaylist);
router.post('/:id/sermons', addSermonToPlaylist);
router.delete('/:id/sermons/:sermonId', removeSermonFromPlaylist);
router.post('/:id/play', incrementPlays);
router.post('/bookmark/:sermonId', toggleSermonBookmark);

export default router;
