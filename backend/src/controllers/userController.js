import pool from '../config/database.js';
import bcrypt from 'bcryptjs';

export const getUserStats = async (req, res) => {
  try {
    console.log('Fetching user statistics...');
    
    const statsQuery = `
      SELECT 
        COUNT(*) as total_users,
        COUNT(*) FILTER (WHERE status = 'active') as active_users,
        COUNT(*) FILTER (WHERE role IN ('admin', 'pastor', 'minister', 'staff')) as staff_members,
        COUNT(*) FILTER (WHERE role = 'member') as volunteers
      FROM users
    `;
    
    const result = await pool.query(statsQuery);
    const stats = result.rows[0];
    
    res.json({
      totalUsers: parseInt(stats.total_users),
      activeUsers: parseInt(stats.active_users),
      staffMembers: parseInt(stats.staff_members),
      volunteers: parseInt(stats.volunteers)
    });
  } catch (error) {
    console.error('Get user stats error:', error.message);
    res.status(500).json({ error: error.message });
  }
};


export const getUsers = async (req, res) => {
  try {
    console.log('Fetching users...');
    const { search, role, status, page = 1, limit = 10 } = req.query;
    
    let query = 'SELECT id, name, email, role, phone, status, created_at FROM users WHERE 1=1';
    let countQuery = 'SELECT COUNT(*) FROM users WHERE 1=1';
    const params = [];
    let paramCount = 1;

    if (search) {
      const searchCondition = ` AND (name ILIKE $${paramCount} OR email ILIKE $${paramCount})`;
      query += searchCondition;
      countQuery += searchCondition;
      params.push(`%${search}%`);
      paramCount++;
    }

    if (role) {
      const roleCondition = ` AND role = $${paramCount}`;
      query += roleCondition;
      countQuery += roleCondition;
      params.push(role);
      paramCount++;
    }

    if (status) {
      const statusCondition = ` AND status = $${paramCount}`;
      query += statusCondition;
      countQuery += statusCondition;
      params.push(status);
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
    console.log(`Found ${result.rows.length} users (page ${page} of ${Math.ceil(total / limit)})`);
    
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
    console.error('Get users error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    console.log('Fetching user:', req.params.id);
    const result = await pool.query('SELECT id, name, email, role, phone, status, created_at FROM users WHERE id = $1', [req.params.id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Get user error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    console.log('Creating user:', req.body.email);
    const { name, email, password, role, phone, status } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (name, email, password, role, phone, status)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, name, email, role, phone, status, created_at`,
      [name, email, hashedPassword, role || 'member', phone || null, status || 'active']
    );

    console.log('User created:', result.rows[0].id);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Create user error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    console.log('Updating user:', req.params.id);
    const { name, email, role, phone, status } = req.body;

    const result = await pool.query(
      `UPDATE users 
       SET name = $1, email = $2, role = $3, phone = $4, status = $5, updated_at = CURRENT_TIMESTAMP
       WHERE id = $6 RETURNING id, name, email, role, phone, status, created_at`,
      [name, email, role, phone, status, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    console.log('User updated:', result.rows[0].id);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Update user error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    console.log('Deleting user:', req.params.id);
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING id', [req.params.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    console.log('User deleted:', req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    console.log('Resetting password for user:', req.params.id);
    const { password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'UPDATE users SET password = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING id',
      [hashedPassword, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    console.log('Password reset for user:', req.params.id);
    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Reset password error:', error.message);
    res.status(500).json({ error: error.message });
  }
};
