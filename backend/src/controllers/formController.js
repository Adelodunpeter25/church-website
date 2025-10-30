import pool from '../config/database.js';

export const getForms = async (req, res) => {
  try {
    console.log('Fetching forms...');
    const { search, status, type, page = 1, limit = 10 } = req.query;
    
    let query = 'SELECT * FROM forms WHERE 1=1';
    let countQuery = 'SELECT COUNT(*) FROM forms WHERE 1=1';
    const params = [];
    let paramCount = 1;

    if (search) {
      const searchCondition = ` AND (title ILIKE $${paramCount} OR description ILIKE $${paramCount})`;
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
    query += ` ORDER BY created_at DESC LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
    params.push(limit, offset);

    const [result, countResult] = await Promise.all([
      pool.query(query, params),
      pool.query(countQuery, params.slice(0, paramCount - 1))
    ]);

    const total = parseInt(countResult.rows[0].count);
    console.log(`Found ${result.rows.length} forms (page ${page} of ${Math.ceil(total / limit)})`);
    
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
    console.error('Get forms error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getForm = async (req, res) => {
  try {
    console.log('Fetching form:', req.params.id);
    const result = await pool.query('SELECT * FROM forms WHERE id = $1', [req.params.id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Form not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Get form error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const createForm = async (req, res) => {
  try {
    console.log('Creating form:', req.body.title);
    const { title, description, type, status, fields } = req.body;

    const result = await pool.query(
      `INSERT INTO forms (title, description, type, status, fields)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [title, description || null, type, status || 'active', JSON.stringify(fields)]
    );

    console.log('Form created:', result.rows[0].id);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Create form error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const updateForm = async (req, res) => {
  try {
    console.log('Updating form:', req.params.id);
    const { title, description, type, status, fields } = req.body;

    const result = await pool.query(
      `UPDATE forms 
       SET title = $1, description = $2, type = $3, status = $4, fields = $5, updated_at = CURRENT_TIMESTAMP
       WHERE id = $6 RETURNING *`,
      [title, description, type, status, JSON.stringify(fields), req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Form not found' });
    }

    console.log('Form updated:', result.rows[0].id);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Update form error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const deleteForm = async (req, res) => {
  try {
    console.log('Deleting form:', req.params.id);
    const result = await pool.query('DELETE FROM forms WHERE id = $1 RETURNING id', [req.params.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Form not found' });
    }

    console.log('Form deleted:', req.params.id);
    res.json({ message: 'Form deleted successfully' });
  } catch (error) {
    console.error('Delete form error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const submitFormResponse = async (req, res) => {
  try {
    console.log('Submitting form response:', req.params.id);
    const { member_id, responses } = req.body;

    const result = await pool.query(
      `INSERT INTO form_responses (form_id, member_id, responses)
       VALUES ($1, $2, $3) RETURNING *`,
      [req.params.id, member_id || null, JSON.stringify(responses)]
    );

    await pool.query('UPDATE forms SET responses = responses + 1 WHERE id = $1', [req.params.id]);

    console.log('Form response submitted:', result.rows[0].id);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Submit form response error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getFormResponses = async (req, res) => {
  try {
    console.log('Fetching form responses:', req.params.id);
    const result = await pool.query(
      `SELECT fr.*, m.name as member_name, m.email as member_email 
       FROM form_responses fr 
       LEFT JOIN members m ON fr.member_id = m.id 
       WHERE fr.form_id = $1 
       ORDER BY fr.submitted_at DESC`,
      [req.params.id]
    );

    console.log(`Found ${result.rows.length} responses`);
    res.json(result.rows);
  } catch (error) {
    console.error('Get form responses error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const deleteForms = async (req, res) => {
  try {
    console.log('Deleting multiple forms');
    const { ids } = req.body;

    const result = await pool.query('DELETE FROM forms WHERE id = ANY($1) RETURNING id', [ids]);

    console.log(`Deleted ${result.rows.length} forms`);
    res.json({ message: `${result.rows.length} forms deleted successfully` });
  } catch (error) {
    console.error('Delete forms error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const exportFormResponses = async (req, res) => {
  try {
    console.log('Exporting form responses:', req.params.id);
    const result = await pool.query(
      `SELECT fr.*, m.name as member_name, m.email as member_email 
       FROM form_responses fr 
       LEFT JOIN members m ON fr.member_id = m.id 
       WHERE fr.form_id = $1 
       ORDER BY fr.submitted_at DESC`,
      [req.params.id]
    );

    console.log(`Exporting ${result.rows.length} responses`);
    res.json({ data: result.rows, count: result.rows.length });
  } catch (error) {
    console.error('Export form responses error:', error.message);
    res.status(500).json({ error: error.message });
  }
};
