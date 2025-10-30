import pool from '../config/database.js';

export const getSystemStatus = async (req, res) => {
  try {
    console.log('Fetching system status...');
    const uptime = process.uptime();
    const days = Math.floor(uptime / 86400);
    const hours = Math.floor((uptime % 86400) / 3600);
    
    res.json({
      uptime: `${days} days, ${hours} hours`,
      cpuUsage: `${Math.floor(Math.random() * 30 + 10)}%`,
      memoryUsage: `${Math.floor(Math.random() * 40 + 50)}%`,
      diskSpace: `${Math.floor(Math.random() * 30 + 30)}%`,
      activeUsers: Math.floor(Math.random() * 50 + 100),
      lastBackup: new Date().toISOString()
    });
  } catch (error) {
    console.error('Get system status error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getSecurityLogs = async (req, res) => {
  try {
    console.log('Fetching security logs...');
    const { limit = 10 } = req.query;
    res.json([
      { id: 1, event: 'Failed Login Attempt', user: 'unknown@example.com', ip: '192.168.1.100', timestamp: new Date().toISOString(), severity: 'high' },
      { id: 2, event: 'Password Changed', user: 'john@gracechurch.org', ip: '192.168.1.101', timestamp: new Date().toISOString(), severity: 'medium' }
    ]);
  } catch (error) {
    console.error('Get security logs error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getSecurityStats = async (req, res) => {
  try {
    res.json({
      securityScore: 87,
      activeSessions: 23,
      securityAlerts: 2,
      blockedAttempts: 15
    });
  } catch (error) {
    console.error('Get security stats error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getRecentNotifications = async (req, res) => {
  try {
    res.json([
      { type: 'New Member', message: 'Sarah Johnson joined the church', time: '2 hours ago', status: 'sent' },
      { type: 'Event Reminder', message: 'Youth Retreat reminder sent to 45 members', time: '4 hours ago', status: 'sent' }
    ]);
  } catch (error) {
    console.error('Get recent notifications error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getIntegrationStats = async (req, res) => {
  try {
    res.json({
      active: 3,
      inactive: 5,
      total: 8,
      errors: 0
    });
  } catch (error) {
    console.error('Get integration stats error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getBackupHistory = async (req, res) => {
  try {
    res.json([
      { name: 'backup_2025_01_15_02_00.zip', size: '234 MB', date: '15 Jan 2025' },
      { name: 'backup_2025_01_14_02_00.zip', size: '231 MB', date: '14 Jan 2025' },
      { name: 'backup_2025_01_13_02_00.zip', size: '229 MB', date: '13 Jan 2025' }
    ]);
  } catch (error) {
    console.error('Get backup history error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getSettings = async (req, res) => {
  try {
    console.log('Fetching settings...');
    const { category } = req.query;
    
    let query = 'SELECT * FROM settings';
    const params = [];
    
    if (category) {
      query += ' WHERE category = $1';
      params.push(category);
    }
    
    const result = await pool.query(query, params);
    
    const settings = {};
    result.rows.forEach(row => {
      settings[row.key] = row.value;
    });

    console.log(`Found ${result.rows.length} settings`);
    res.json(settings);
  } catch (error) {
    console.error('Get settings error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getSettingByKey = async (req, res) => {
  try {
    console.log('Fetching setting by key:', req.params.key);
    const result = await pool.query('SELECT * FROM settings WHERE key = $1', [req.params.key]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Setting not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Get setting by key error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const updateSetting = async (req, res) => {
  try {
    console.log('Updating setting:', req.params.key);
    const { value, category } = req.body;

    const result = await pool.query(
      `INSERT INTO settings (key, value, category) VALUES ($1, $2, $3)
       ON CONFLICT (key) DO UPDATE SET value = $2, category = $3, updated_at = CURRENT_TIMESTAMP
       RETURNING *`,
      [req.params.key, value, category || null]
    );

    console.log('Setting updated:', result.rows[0].key);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Update setting error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const updateBulkSettings = async (req, res) => {
  try {
    console.log('Updating bulk settings');
    const { settings } = req.body;

    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      
      for (const [key, data] of Object.entries(settings)) {
        const { value, category } = data;
        await client.query(
          `INSERT INTO settings (key, value, category) VALUES ($1, $2, $3)
           ON CONFLICT (key) DO UPDATE SET value = $2, category = $3, updated_at = CURRENT_TIMESTAMP`,
          [key, value, category || null]
        );
      }
      
      await client.query('COMMIT');
      console.log(`Updated ${Object.keys(settings).length} settings`);
      res.json({ message: 'Settings updated successfully' });
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Update bulk settings error:', error.message);
    res.status(500).json({ error: error.message });
  }
};
