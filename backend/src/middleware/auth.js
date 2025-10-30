import jwt from 'jsonwebtoken';

export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
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
        return res.status(401).json({ error: 'Token has been invalidated' });
      }
    }
    
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    next();
  };
};
