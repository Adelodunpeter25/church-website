import pool from '../config/database.js';

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
