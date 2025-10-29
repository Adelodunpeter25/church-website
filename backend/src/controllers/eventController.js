import pool from '../config/database.js';

export const getEvents = async (req, res) => {
  try {
    console.log('Fetching events...');
    const { search, status, type, page = 1, limit = 10 } = req.query;
    
    let query = 'SELECT * FROM events WHERE 1=1';
    let countQuery = 'SELECT COUNT(*) FROM events WHERE 1=1';
    const params = [];
    let paramCount = 1;

    if (search) {
      const searchCondition = ` AND (title ILIKE $${paramCount} OR description ILIKE $${paramCount} OR location ILIKE $${paramCount})`;
      query += searchCondition;
      countQuery += searchCondition;
      params.push(`%${search}%`);
      paramCount++;
    }

    if (status) {
      const statusCondition = ` AND status = $${paramCount}`;
      query += statusCondition;
      countQuery += statusCondition;
      params.push(status);
      paramCount++;
    }

    if (type) {
      const typeCondition = ` AND type = $${paramCount}`;
      query += typeCondition;
      countQuery += typeCondition;
      params.push(type);
      paramCount++;
    }

    const offset = (page - 1) * limit;
    query += ` ORDER BY date DESC LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
    params.push(limit, offset);

    const [result, countResult] = await Promise.all([
      pool.query(query, params),
      pool.query(countQuery, params.slice(0, paramCount - 1))
    ]);

    const total = parseInt(countResult.rows[0].count);
    console.log(`Found ${result.rows.length} events (page ${page} of ${Math.ceil(total / limit)})`);
    
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
    console.error('Get events error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getEvent = async (req, res) => {
  try {
    console.log('Fetching event:', req.params.id);
    const result = await pool.query('SELECT * FROM events WHERE id = $1', [req.params.id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Get event error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const createEvent = async (req, res) => {
  try {
    console.log('Creating event:', req.body.title);
    const { title, description, date, start_time, end_time, location, type, capacity, status } = req.body;

    const result = await pool.query(
      `INSERT INTO events (title, description, date, start_time, end_time, location, type, capacity, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [title, description || null, date, start_time, end_time, location, type, capacity || null, status || 'upcoming']
    );

    console.log('Event created:', result.rows[0].id);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Create event error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    console.log('Updating event:', req.params.id);
    const { title, description, date, start_time, end_time, location, type, capacity, status } = req.body;

    const result = await pool.query(
      `UPDATE events 
       SET title = $1, description = $2, date = $3, start_time = $4, end_time = $5, 
           location = $6, type = $7, capacity = $8, status = $9, updated_at = CURRENT_TIMESTAMP
       WHERE id = $10 RETURNING *`,
      [title, description, date, start_time, end_time, location, type, capacity, status, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }

    console.log('Event updated:', result.rows[0].id);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Update event error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    console.log('Deleting event:', req.params.id);
    const result = await pool.query('DELETE FROM events WHERE id = $1 RETURNING id', [req.params.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }

    console.log('Event deleted:', req.params.id);
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Delete event error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const registerForEvent = async (req, res) => {
  try {
    console.log('Registering for event:', req.params.id);
    const { member_id } = req.body;

    await pool.query(
      'INSERT INTO event_registrations (event_id, member_id) VALUES ($1, $2)',
      [req.params.id, member_id]
    );

    await pool.query('UPDATE events SET registered_count = registered_count + 1 WHERE id = $1', [req.params.id]);

    console.log('Registration successful');
    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Register event error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const unregisterFromEvent = async (req, res) => {
  try {
    console.log('Unregistering from event:', req.params.id);
    const result = await pool.query(
      'DELETE FROM event_registrations WHERE event_id = $1 AND member_id = $2 RETURNING id',
      [req.params.id, req.params.memberId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Registration not found' });
    }

    await pool.query('UPDATE events SET registered_count = registered_count - 1 WHERE id = $1', [req.params.id]);

    console.log('Unregistration successful');
    res.json({ message: 'Unregistration successful' });
  } catch (error) {
    console.error('Unregister event error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getEventAttendees = async (req, res) => {
  try {
    console.log('Fetching event attendees:', req.params.id);
    const result = await pool.query(
      `SELECT er.*, m.name, m.email, m.phone 
       FROM event_registrations er 
       JOIN members m ON er.member_id = m.id 
       WHERE er.event_id = $1 
       ORDER BY er.registered_at DESC`,
      [req.params.id]
    );

    console.log(`Found ${result.rows.length} attendees`);
    res.json(result.rows);
  } catch (error) {
    console.error('Get attendees error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const markAttendance = async (req, res) => {
  try {
    console.log('Marking attendance:', req.params.id, req.params.memberId);
    const { attended } = req.body;

    const result = await pool.query(
      'UPDATE event_registrations SET attended = $1 WHERE event_id = $2 AND member_id = $3 RETURNING *',
      [attended, req.params.id, req.params.memberId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Registration not found' });
    }

    console.log('Attendance marked');
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Mark attendance error:', error.message);
    res.status(500).json({ error: error.message });
  }
};
