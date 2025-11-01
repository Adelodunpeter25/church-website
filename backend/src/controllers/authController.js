import pool from '../config/database.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AUTH, HTTP_STATUS, AUDIT_ACTIONS } from '../config/constants.js';

export const register = async (req, res) => {
  try {
    console.log('Registering user:', req.body.email);
    const { name, email, password, phone } = req.body;

    const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      return res.status(HTTP_STATUS.CONFLICT).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, AUTH.PASSWORD_MIN_LENGTH);

    const result = await pool.query(
      `INSERT INTO users (name, email, password, role, phone, status)
       VALUES ($1, $2, $3, 'member', $4, 'active') 
       RETURNING id, name, email, role, phone, status, created_at`,
      [name, email, hashedPassword, phone || null]
    );

    const token = jwt.sign(
      { userId: result.rows[0].id, email: result.rows[0].email, role: result.rows[0].role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || AUTH.JWT_EXPIRES_IN }
    );

    console.log('User registered:', result.rows[0].id);
    res.status(HTTP_STATUS.CREATED).json({ user: result.rows[0], token });
  } catch (error) {
    console.error('Register error:', error.message);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    console.log('Login attempt:', req.body.email);
    const { email, password } = req.body;

    const settingsResult = await pool.query(
      "SELECT key, value FROM settings WHERE key IN ('maxLoginAttempts', 'lockoutDuration')"
    );
    const settings = {};
    settingsResult.rows.forEach(row => {
      settings[row.key] = parseInt(row.value) || (row.key === 'maxLoginAttempts' ? AUTH.MAX_LOGIN_ATTEMPTS : AUTH.LOCKOUT_DURATION_MINUTES);
    });

    const lockoutCheck = await pool.query(
      "SELECT COUNT(*) as count, MAX(created_at) as last_attempt FROM audit_logs WHERE user_email = $1 AND event = 'Failed Login Attempt' AND created_at > NOW() - INTERVAL '1 minute' * $2",
      [email, settings.lockoutDuration || 15]
    );

    if (parseInt(lockoutCheck.rows[0].count) >= (settings.maxLoginAttempts || AUTH.MAX_LOGIN_ATTEMPTS)) {
      await pool.query(
        "INSERT INTO audit_logs (event, user_email, ip_address, severity, details) VALUES ('Account Locked', $1, $2, 'high', 'Too many failed login attempts')",
        [email, req.ip]
      );
      return res.status(HTTP_STATUS.TOO_MANY_REQUESTS).json({ error: 'Account temporarily locked due to too many failed attempts' });
    }

    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    
    if (result.rows.length === 0) {
      await pool.query(
        "INSERT INTO audit_logs (event, user_email, ip_address, severity) VALUES ('Failed Login Attempt', $1, $2, 'medium')",
        [email, req.ip]
      );
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: 'Invalid credentials' });
    }

    const user = result.rows[0];

    if (user.status !== 'active') {
      return res.status(HTTP_STATUS.FORBIDDEN).json({ error: 'Account is inactive' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    
    if (!isValid) {
      await pool.query(
        "INSERT INTO audit_logs (event, user_email, user_id, ip_address, severity) VALUES ('Failed Login Attempt', $1, $2, $3, 'medium')",
        [email, user.id, req.ip]
      );
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || AUTH.JWT_EXPIRES_IN }
    );

    const userAgent = req.headers['user-agent'] || '';
    const device = parseUserAgent(userAgent);
    
    await pool.query(
      "INSERT INTO audit_logs (event, user_email, user_id, ip_address, device, severity) VALUES ('Successful Login', $1, $2, $3, $4, 'low')",
      [email, user.id, req.ip, device]
    );

    const { password: _, ...userWithoutPassword } = user;

    console.log('Login successful:', user.id);
    res.json({ user: userWithoutPassword, token });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

export const verifyToken = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
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
    
    const result = await pool.query(
      'SELECT id, name, email, role, phone, status, created_at FROM users WHERE id = $1',
      [decoded.userId]
    );

    if (result.rows.length === 0) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: 'User not found' });
    }

    res.json({ user: result.rows[0] });
  } catch (error) {
    console.error('Verify token error:', error.message);
    res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: 'Invalid token' });
  }
};

const parseUserAgent = (userAgent) => {
  if (!userAgent) return 'Unknown Device';
  
  if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) {
    return userAgent.includes('Mobile') ? 'Chrome Mobile' : 'Chrome Desktop';
  }
  if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
    return userAgent.includes('Mobile') ? 'Safari Mobile' : 'Safari Desktop';
  }
  if (userAgent.includes('Firefox')) {
    return userAgent.includes('Mobile') ? 'Firefox Mobile' : 'Firefox Desktop';
  }
  if (userAgent.includes('Edg')) {
    return 'Microsoft Edge';
  }
  if (userAgent.includes('Mobile')) return 'Mobile Browser';
  
  return 'Desktop Browser';
};

export const getLoginHistory = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, event, device, created_at as login_time FROM audit_logs WHERE user_id = $1 AND event IN ('Successful Login', 'Failed Login Attempt') ORDER BY created_at DESC LIMIT 10",
      [req.params.userId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Get login history error:', error.message);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

export const logoutAll = async (req, res) => {
  try {
    await pool.query(
      "INSERT INTO token_blacklist (user_id) VALUES ($1)",
      [req.params.userId]
    );
    await pool.query(
      "INSERT INTO audit_logs (event, user_id, ip_address, severity) VALUES ('Logout All Devices', $1, $2, 'medium')",
      [req.params.userId, req.ip]
    );
    res.json({ message: 'Logged out from all devices' });
  } catch (error) {
    console.error('Logout all error:', error.message);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};
