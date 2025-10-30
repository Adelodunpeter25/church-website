import pool from '../config/database.js';

export const getLivestreams = async (req, res) => {
  try {
    console.log('Fetching livestreams...');
    const result = await pool.query('SELECT * FROM livestreams ORDER BY created_at DESC LIMIT 10');
    console.log(`Found ${result.rows.length} livestreams`);
    res.json(result.rows);
  } catch (error) {
    console.error('Get livestreams error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getCurrentLivestream = async (req, res) => {
  try {
    console.log('Fetching current livestream...');
    const result = await pool.query('SELECT * FROM livestreams WHERE is_live = true ORDER BY start_time DESC LIMIT 1');
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No active livestream' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Get current livestream error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const createLivestream = async (req, res) => {
  try {
    console.log('Creating livestream:', req.body.title);
    const { title, description, stream_url } = req.body;

    const result = await pool.query(
      'INSERT INTO livestreams (title, description, stream_url, is_live, start_time) VALUES ($1, $2, $3, true, CURRENT_TIMESTAMP) RETURNING *',
      [title, description || null, stream_url || null]
    );

    console.log('Livestream created:', result.rows[0].id);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Create livestream error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const updateLivestream = async (req, res) => {
  try {
    console.log('Updating livestream:', req.params.id);
    const { title, description, stream_url, is_live, viewers } = req.body;

    const result = await pool.query(
      'UPDATE livestreams SET title = $1, description = $2, stream_url = $3, is_live = $4, viewers = $5 WHERE id = $6 RETURNING *',
      [title, description, stream_url, is_live, viewers, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Livestream not found' });
    }

    console.log('Livestream updated:', result.rows[0].id);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Update livestream error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const endLivestream = async (req, res) => {
  try {
    console.log('Ending livestream:', req.params.id);
    const result = await pool.query(
      'UPDATE livestreams SET is_live = false, end_time = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *',
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Livestream not found' });
    }

    console.log('Livestream ended:', result.rows[0].id);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('End livestream error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getChatMessages = async (req, res) => {
  try {
    console.log('Fetching chat messages:', req.params.id);
    const { limit = 50 } = req.query;

    const result = await pool.query(
      'SELECT * FROM chat_messages WHERE livestream_id = $1 ORDER BY created_at DESC LIMIT $2',
      [req.params.id, limit]
    );

    console.log(`Found ${result.rows.length} messages`);
    res.json(result.rows.reverse());
  } catch (error) {
    console.error('Get chat messages error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const sendChatMessage = async (req, res) => {
  try {
    console.log('Sending chat message:', req.params.id);
    const { user_id, user_name, text } = req.body;

    const result = await pool.query(
      'INSERT INTO chat_messages (livestream_id, user_id, user_name, text) VALUES ($1, $2, $3, $4) RETURNING *',
      [req.params.id, user_id || null, user_name, text]
    );

    console.log('Chat message sent:', result.rows[0].id);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Send chat message error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const updateViewerCount = async (req, res) => {
  try {
    const { viewers } = req.body;
    await pool.query('UPDATE livestreams SET viewers = $1 WHERE id = $2', [viewers, req.params.id]);
    res.json({ message: 'Viewer count updated' });
  } catch (error) {
    console.error('Update viewer count error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getStreamHistory = async (req, res) => {
  try {
    console.log('Fetching stream history...');
    const result = await pool.query(
      'SELECT * FROM livestreams WHERE is_live = false AND end_time IS NOT NULL ORDER BY start_time DESC LIMIT 10'
    );
    console.log(`Found ${result.rows.length} past streams`);
    res.json(result.rows);
  } catch (error) {
    console.error('Get stream history error:', error.message);
    res.status(500).json({ error: error.message });
  }
};
