import jwt from 'jsonwebtoken';
import { HTTP_STATUS } from '../config/constants.js';

export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const { default: pool } = await import('../config/database.js');
    const blacklist = await pool.query(
      'SELECT created_at FROM token_blacklist WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1',
      [decoded.userId]
    );
    
    if (blacklist.rows.length > 0) {
      const tokenIat = new Date(decoded.iat * 1000);
      const logoutTime = new Date(blacklist.rows[0].created_at);
      if (tokenIat < logoutTime) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: 'Token has been invalidated' });
      }
    }
    
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: 'Invalid token' });
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: 'Not authenticated' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(HTTP_STATUS.FORBIDDEN).json({ error: 'Insufficient permissions' });
    }

    next();
  };
};
