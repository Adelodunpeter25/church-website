import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './config/database.js';
import { serveFiles } from './services/storageService.js';
import { initializeSocket } from './config/socket.js';
import { initWebSocket } from './websocket/livestreamWebSocket.js';
import healthRoutes from './routes/healthRoutes.js';
import authRoutes from './routes/authRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import memberRoutes from './routes/memberRoutes.js';
import sermonRoutes from './routes/sermonRoutes.js';
import seriesRoutes from './routes/seriesRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import announcementRoutes from './routes/announcementRoutes.js';
import formRoutes from './routes/formRoutes.js';
import playlistRoutes from './routes/playlistRoutes.js';
import livestreamRoutes from './routes/livestreamRoutes.js';
import userRoutes from './routes/userRoutes.js';
import roleRoutes from './routes/roleRoutes.js';
import givingRoutes from './routes/givingRoutes.js';
import prayerRoutes from './routes/prayerRoutes.js';
import contentRoutes from './routes/contentRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import permissionRoutes from './routes/permissionRoutes.js';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT;

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', serveFiles);

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Church API is running' });
});

app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/sermons', sermonRoutes);
app.use('/api/series', seriesRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/forms', formRoutes);
app.use('/api/playlists', playlistRoutes);
app.use('/api/livestreams', livestreamRoutes);
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/giving', givingRoutes);
app.use('/api/prayers', prayerRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/permissions', permissionRoutes);

initializeSocket(httpServer);
initWebSocket(httpServer);

httpServer.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  console.log('WebSocket server ready');
  console.log('Livestream WebSocket ready');
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('Database connected successfully at:', result.rows[0].now);
  } catch (err) {
    console.error('Database connection error:', err.message);
  }
});
