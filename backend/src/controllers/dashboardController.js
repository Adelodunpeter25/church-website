import pool from '../config/database.js';

export const getDashboardStats = async (req, res) => {
  try {
    console.log('Fetching dashboard stats...');
    const totalMembers = await pool.query(`
      SELECT COUNT(*) as count FROM users WHERE membership_status = 'active' AND role = 'member'
    `);
    const newMembersThisWeek = await pool.query(`
      SELECT COUNT(*) as count FROM users 
      WHERE date_joined >= CURRENT_DATE - INTERVAL '7 days' AND role = 'member'
    `);

    const thisWeekAttendance = await pool.query(`
      SELECT COUNT(DISTINCT user_id) as count FROM attendance 
      WHERE date >= CURRENT_DATE - INTERVAL '7 days' AND present = true
    `);
    const lastWeekAttendance = await pool.query(`
      SELECT COUNT(DISTINCT user_id) as count FROM attendance 
      WHERE date >= CURRENT_DATE - INTERVAL '14 days' 
      AND date < CURRENT_DATE - INTERVAL '7 days' AND present = true
    `);
    const attendanceChange = lastWeekAttendance.rows[0].count > 0 
      ? Math.round(((thisWeekAttendance.rows[0].count - lastWeekAttendance.rows[0].count) / lastWeekAttendance.rows[0].count) * 100)
      : 0;

    const sermonDownloads = await pool.query(`
      SELECT COALESCE(SUM(downloads), 0) as count FROM sermons
    `);
    const downloadsLastMonth = await pool.query(`
      SELECT COALESCE(SUM(downloads), 0) as count FROM sermons 
      WHERE created_at < CURRENT_DATE - INTERVAL '30 days'
    `);
    const downloadsChange = downloadsLastMonth.rows[0].count > 0
      ? Math.round(((sermonDownloads.rows[0].count - downloadsLastMonth.rows[0].count) / downloadsLastMonth.rows[0].count) * 100)
      : 0;

    const liveViewers = await pool.query(`
      SELECT COALESCE(viewers, 0) as count, is_live FROM livestreams 
      ORDER BY created_at DESC LIMIT 1
    `);

    const totalSermons = await pool.query(`
      SELECT COUNT(*) as count FROM sermons
    `);

    const upcomingEvents = await pool.query(`
      SELECT COUNT(*) as count FROM events WHERE date >= CURRENT_DATE
    `);

    const activeAnnouncements = await pool.query(`
      SELECT COUNT(*) as count FROM announcements
    `);

    const totalForms = await pool.query(`
      SELECT COUNT(*) as count FROM forms
    `);

    const response = {
      totalMembers: parseInt(totalMembers.rows[0].count),
      newMembersThisWeek: parseInt(newMembersThisWeek.rows[0].count),
      weeklyAttendance: parseInt(thisWeekAttendance.rows[0].count),
      attendanceChange: attendanceChange,
      sermonDownloads: parseInt(sermonDownloads.rows[0].count),
      downloadsChange: downloadsChange,
      liveViewers: parseInt(liveViewers.rows[0]?.count || 0),
      isLive: liveViewers.rows[0]?.is_live || false,
      totalSermons: parseInt(totalSermons.rows[0].count),
      upcomingEvents: parseInt(upcomingEvents.rows[0].count),
      activeAnnouncements: parseInt(activeAnnouncements.rows[0].count),
      totalForms: parseInt(totalForms.rows[0].count)
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
        SELECT 'member' as type, name as title, date_joined as date FROM users WHERE role = 'member' ORDER BY date_joined DESC LIMIT 5
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
    
    let downloadedSermons = { rows: [{ count: 0 }] };
    try {
      downloadedSermons = await pool.query(
        `SELECT COUNT(DISTINCT sermon_id) as count FROM sermon_downloads 
         WHERE user_id = $1`,
        [req.params.memberId]
      );
    } catch (err) {
      console.log('sermon_downloads table may not exist yet');
    }
    
    let givingTotal = { rows: [{ total: 0 }] };
    try {
      givingTotal = await pool.query(
        `SELECT COALESCE(SUM(amount), 0) as total FROM giving 
         WHERE user_id = $1 
         AND EXTRACT(YEAR FROM date) = EXTRACT(YEAR FROM CURRENT_DATE)`,
        [req.params.memberId]
      );
    } catch (err) {
      console.log('giving table may not have user_id column yet');
    }
    
    let eventsCount = { rows: [{ count: 0 }] };
    try {
      eventsCount = await pool.query(
        `SELECT COUNT(*) as count FROM event_registrations 
         WHERE user_id = $1 AND attended = true`,
        [req.params.memberId]
      );
    } catch (err) {
      console.log('event_registrations table may not have user_id column yet');
    }

    res.json({
      downloadedSermons: parseInt(downloadedSermons.rows[0]?.count || 0),
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
