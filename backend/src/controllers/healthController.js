import pool from '../config/database.js';

export const healthCheck = async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({
      status: 'ok',
      message: 'Church API is running',
      database: 'connected',
      timestamp: result.rows[0].now
    });
  } catch (error) {
    res.status(503).json({
      status: 'error',
      message: 'Church API is running',
      database: 'disconnected',
      error: error.message
    });
  }
};
