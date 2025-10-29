import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './config/database.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import memberRoutes from './routes/memberRoutes.js';
import sermonRoutes from './routes/sermonRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Church API is running' });
});

app.use('/api/dashboard', dashboardRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/sermons', sermonRoutes);

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('Database connected successfully at:', result.rows[0].now);
  } catch (err) {
    console.error('Database connection error:', err.message);
  }
});
