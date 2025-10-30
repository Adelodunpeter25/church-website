import pool from '../config/database.js';

export const getDashboardStats = async (req, res) => {
  try {
    console.log('Fetching dashboard stats...');
    const totalMembers = await pool.query(`
      SELECT COUNT(*) as count FROM members WHERE membership_status = 'active'
    `);
    const newMembersThisWeek = await pool.query(`
      SELECT COUNT(*) as count FROM members 
      WHERE date_joined >= CURRENT_DATE - INTERVAL '7 days'
    `);

    const thisWeekAttendance = await pool.query(`
      SELECT COUNT(DISTINCT member_id) as count FROM attendance 
      WHERE date >= CURRENT_DATE - INTERVAL '7 days' AND present = true
    `);
    const lastWeekAttendance = await pool.query(`
      SELECT COUNT(DISTINCT member_id) as count FROM attendance 
      WHERE date >= CURRENT_DATE - INTERVAL '14 days' 
      AND date < CURRENT_DATE - INTERVAL '7 days' AND present = true
    `);
    const attendanceChange = lastWeekAttendance.rows[0].count > 0 
      ? Math.round(((thisWeekAttendance.rows[0].count - lastWeekAttendance.rows[0].count) / lastWeekAttendance.rows[0].count) * 100)
      : 0;

    const sermonDownloads = await pool.query(`
      SELECT COALESCE(SUM(plays), 0) as count FROM sermons
    `);
    const downloadsLastMonth = await pool.query(`
      SELECT COALESCE(SUM(plays), 0) as count FROM sermons 
      WHERE created_at < CURRENT_DATE - INTERVAL '30 days'
    `);
    const downloadsChange = downloadsLastMonth.rows[0].count > 0
      ? Math.round(((sermonDownloads.rows[0].count - downloadsLastMonth.rows[0].count) / downloadsLastMonth.rows[0].count) * 100)
      : 0;

    const liveViewers = await pool.query(`
      SELECT COALESCE(viewers, 0) as count, is_live FROM livestreams 
      ORDER BY created_at DESC LIMIT 1
    `);

    const response = {
      totalMembers: parseInt(totalMembers.rows[0].count),
      newMembersThisWeek: parseInt(newMembersThisWeek.rows[0].count),
      weeklyAttendance: parseInt(thisWeekAttendance.rows[0].count),
      attendanceChange: attendanceChange,
      sermonDownloads: parseInt(sermonDownloads.rows[0].count),
      downloadsChange: downloadsChange,
      liveViewers: parseInt(liveViewers.rows[0]?.count || 0),
      isLive: liveViewers.rows[0]?.is_live || false
    };
    console.log('Dashboard stats:', response);
    res.json(response);
  } catch (error) {
    console.error('Dashboard stats error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getRecentActivity = async (req, res) => {
  try {
    console.log('Fetching recent activity...');
    const activities = await pool.query(`
      (
        SELECT 'member' as type, name as title, date_joined as date FROM members ORDER BY date_joined DESC LIMIT 5
      )
      UNION ALL
      (
        SELECT 'sermon' as type, title, date FROM sermons ORDER BY date DESC LIMIT 5
      )
      UNION ALL
      (
        SELECT 'event' as type, title, date FROM events ORDER BY created_at DESC LIMIT 5
      )
      ORDER BY date DESC
      LIMIT 10
    `);

    console.log('Recent activity count:', activities.rows.length);
    res.json(activities.rows);
  } catch (error) {
    console.error('Recent activity error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getMemberStats = async (req, res) => {
  try {
    console.log('Fetching member stats:', req.params.memberId);
    
    const attendanceCount = await pool.query(
      `SELECT COUNT(*) as count FROM attendance 
       WHERE member_id = $1 AND present = true 
       AND EXTRACT(YEAR FROM date) = EXTRACT(YEAR FROM CURRENT_DATE)`,
      [req.params.memberId]
    );
    
    const givingTotal = await pool.query(
      `SELECT COALESCE(SUM(amount), 0) as total FROM giving 
       WHERE member_id = $1 
       AND EXTRACT(YEAR FROM date) = EXTRACT(YEAR FROM CURRENT_DATE)`,
      [req.params.memberId]
    );
    
    const eventsCount = await pool.query(
      `SELECT COUNT(*) as count FROM event_registrations 
       WHERE member_id = $1 AND attended = true`,
      [req.params.memberId]
    );

    res.json({
      attendanceThisYear: parseInt(attendanceCount.rows[0].count),
      totalGiving: parseFloat(givingTotal.rows[0].total),
      eventsAttended: parseInt(eventsCount.rows[0].count)
    });
  } catch (error) {
    console.error('Get member stats error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getMemberRecentSermons = async (req, res) => {
  try {
    console.log('Fetching recent sermons for member');
    const result = await pool.query(
      'SELECT id, title, speaker, date, duration FROM sermons ORDER BY date DESC LIMIT 3'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Get member recent sermons error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getMemberUpcomingEvents = async (req, res) => {
  try {
    console.log('Fetching upcoming events for member');
    const result = await pool.query(
      `SELECT id, title, date, type, location FROM events 
       WHERE date >= CURRENT_DATE 
       ORDER BY date ASC LIMIT 3`
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Get member upcoming events error:', error.message);
    res.status(500).json({ error: error.message });
  }
};
