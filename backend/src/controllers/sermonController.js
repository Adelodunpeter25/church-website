import pool from '../config/database.js';

export const getSermons = async (req, res) => {
  try {
    console.log('Fetching sermons...');
    const { search, series, speaker, page = 1, limit = 10 } = req.query;
    
    let query = 'SELECT s.*, ss.name as series_name FROM sermons s LEFT JOIN sermon_series ss ON s.series_id = ss.id WHERE 1=1';
    let countQuery = 'SELECT COUNT(*) FROM sermons s WHERE 1=1';
    const params = [];
    let paramCount = 1;

    if (search) {
      const searchCondition = ` AND (s.title ILIKE $${paramCount} OR s.speaker ILIKE $${paramCount} OR s.description ILIKE $${paramCount})`;
      query += searchCondition;
      countQuery += searchCondition.replace(/s\./g, '');
      params.push(`%${search}%`);
      paramCount++;
    }

    if (series) {
      const seriesCondition = ` AND s.series_id = $${paramCount}`;
      query += seriesCondition;
      countQuery += seriesCondition.replace(/s\./g, '');
      params.push(series);
      paramCount++;
    }

    if (speaker) {
      const speakerCondition = ` AND s.speaker ILIKE $${paramCount}`;
      query += speakerCondition;
      countQuery += speakerCondition.replace(/s\./g, '');
      params.push(`%${speaker}%`);
      paramCount++;
    }

    const offset = (page - 1) * limit;
    query += ` ORDER BY s.date DESC LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
    params.push(limit, offset);

    const [result, countResult] = await Promise.all([
      pool.query(query, params),
      pool.query(countQuery, params.slice(0, paramCount - 1))
    ]);

    const total = parseInt(countResult.rows[0].count);
    console.log(`Found ${result.rows.length} sermons (page ${page} of ${Math.ceil(total / limit)})`);
    
    res.json({
      data: result.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get sermons error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getSermon = async (req, res) => {
  try {
    console.log('Fetching sermon:', req.params.id);
    const result = await pool.query(
      'SELECT s.*, ss.name as series_name FROM sermons s LEFT JOIN sermon_series ss ON s.series_id = ss.id WHERE s.id = $1',
      [req.params.id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Sermon not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Get sermon error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const createSermon = async (req, res) => {
  try {
    console.log('Creating sermon:', req.body.title);
    const { title, speaker, date, duration, description, series_id, audio_url, video_url, thumbnail_url, tags } = req.body;

    const result = await pool.query(
      `INSERT INTO sermons (title, speaker, date, duration, description, series_id, audio_url, video_url, thumbnail_url, tags)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [title, speaker, date, duration || null, description || null, series_id || null, audio_url || null, video_url || null, thumbnail_url || null, tags || null]
    );

    if (series_id) {
      await pool.query('UPDATE sermon_series SET sermon_count = sermon_count + 1 WHERE id = $1', [series_id]);
    }

    console.log('Sermon created:', result.rows[0].id);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Create sermon error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const updateSermon = async (req, res) => {
  try {
    console.log('Updating sermon:', req.params.id);
    const { title, speaker, date, duration, description, series_id, audio_url, video_url, thumbnail_url, tags } = req.body;

    const result = await pool.query(
      `UPDATE sermons 
       SET title = $1, speaker = $2, date = $3, duration = $4, description = $5, 
           series_id = $6, audio_url = $7, video_url = $8, thumbnail_url = $9, tags = $10, updated_at = CURRENT_TIMESTAMP
       WHERE id = $11 RETURNING *`,
      [title, speaker, date, duration, description, series_id, audio_url, video_url, thumbnail_url, tags, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Sermon not found' });
    }

    console.log('Sermon updated:', result.rows[0].id);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Update sermon error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const deleteSermon = async (req, res) => {
  try {
    console.log('Deleting sermon:', req.params.id);
    const sermon = await pool.query('SELECT series_id FROM sermons WHERE id = $1', [req.params.id]);
    
    if (sermon.rows.length === 0) {
      return res.status(404).json({ error: 'Sermon not found' });
    }

    await pool.query('DELETE FROM sermons WHERE id = $1', [req.params.id]);

    if (sermon.rows[0].series_id) {
      await pool.query('UPDATE sermon_series SET sermon_count = sermon_count - 1 WHERE id = $1', [sermon.rows[0].series_id]);
    }

    console.log('Sermon deleted:', req.params.id);
    res.json({ message: 'Sermon deleted successfully' });
  } catch (error) {
    console.error('Delete sermon error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const incrementPlays = async (req, res) => {
  try {
    await pool.query('UPDATE sermons SET plays = plays + 1 WHERE id = $1', [req.params.id]);
    res.json({ message: 'Play count incremented' });
  } catch (error) {
    console.error('Increment plays error:', error.message);
    res.status(500).json({ error: error.message });
  }
};
