import pool from '../config/database.js';

export const getContent = async (req, res) => {
  try {
    console.log('Fetching content...');
    const result = await pool.query('SELECT * FROM content');
    
    const content = {};
    result.rows.forEach(row => {
      content[row.key] = row.value;
    });

    console.log(`Found ${result.rows.length} content items`);
    res.json(content);
  } catch (error) {
    console.error('Get content error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getContentByKey = async (req, res) => {
  try {
    console.log('Fetching content by key:', req.params.key);
    const result = await pool.query('SELECT * FROM content WHERE key = $1', [req.params.key]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Content not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Get content by key error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const updateContent = async (req, res) => {
  try {
    console.log('Updating content:', req.params.key);
    const { value } = req.body;

    const result = await pool.query(
      `INSERT INTO content (key, value) VALUES ($1, $2)
       ON CONFLICT (key) DO UPDATE SET value = $2, updated_at = CURRENT_TIMESTAMP
       RETURNING *`,
      [req.params.key, value]
    );

    console.log('Content updated:', result.rows[0].key);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Update content error:', error.message);
    res.status(500).json({ error: error.message });
  }
};
