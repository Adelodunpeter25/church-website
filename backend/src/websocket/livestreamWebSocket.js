import { WebSocketServer } from 'ws';
import pool from '../config/database.js';

let wss = null;
const streamSubscriptions = new Map();

export const initWebSocket = (server) => {
  wss = new WebSocketServer({ server });

  wss.on('connection', (ws) => {
    console.log('WebSocket client connected');

    ws.on('message', async (message) => {
      try {
        const data = JSON.parse(message);

        if (data.type === 'subscribe' && data.streamId) {
          ws.streamId = data.streamId;
          
          if (!streamSubscriptions.has(data.streamId)) {
            streamSubscriptions.set(data.streamId, new Set());
          }
          streamSubscriptions.get(data.streamId).add(ws);
          
          console.log(`Client subscribed to stream: ${data.streamId}`);
          
          const stats = await getStreamStats(data.streamId);
          ws.send(JSON.stringify({ type: 'stats', stats }));
        }
      } catch (error) {
        console.error('WebSocket message error:', error);
      }
    });

    ws.on('close', () => {
      if (ws.streamId && streamSubscriptions.has(ws.streamId)) {
        streamSubscriptions.get(ws.streamId).delete(ws);
        if (streamSubscriptions.get(ws.streamId).size === 0) {
          streamSubscriptions.delete(ws.streamId);
        }
      }
      console.log('WebSocket client disconnected');
    });
  });

  startStatsBroadcast();
};

const getStreamStats = async (streamId) => {
  try {
    const stream = await pool.query('SELECT * FROM livestreams WHERE id = $1', [streamId]);
    if (stream.rows.length === 0) return null;

    const viewers = await pool.query(
      'SELECT COUNT(*) as current_viewers FROM stream_viewers WHERE livestream_id = $1 AND status = $2',
      [streamId, 'active']
    );

    const peakViewers = await pool.query(
      'SELECT MAX(viewers) as peak_viewers FROM livestreams WHERE DATE(start_time) = CURRENT_DATE'
    );

    const chatCount = await pool.query(
      'SELECT COUNT(*) as chat_messages FROM chat_messages WHERE livestream_id = $1',
      [streamId]
    );

    let duration = 0;
    if (stream.rows[0].is_live && stream.rows[0].start_time) {
      const startTime = Date.parse(stream.rows[0].start_time.toISOString());
      duration = Math.floor((Date.now() - startTime) / 1000);
    } else if (!stream.rows[0].is_live && stream.rows[0].start_time && stream.rows[0].end_time) {
      const startTime = Date.parse(stream.rows[0].start_time.toISOString());
      const endTime = Date.parse(stream.rows[0].end_time.toISOString());
      duration = Math.floor((endTime - startTime) / 1000);
    }

    return {
      current_viewers: parseInt(viewers.rows[0].current_viewers),
      peak_viewers: parseInt(peakViewers.rows[0].peak_viewers) || 0,
      duration: duration,
      chat_messages: parseInt(chatCount.rows[0].chat_messages),
      is_live: stream.rows[0].is_live
    };
  } catch (error) {
    console.error('Error getting stream stats:', error);
    return null;
  }
};

const startStatsBroadcast = () => {
  setInterval(async () => {
    for (const [streamId, clients] of streamSubscriptions.entries()) {
      const stats = await getStreamStats(streamId);
      if (stats) {
        console.log(`Broadcasting stats for ${streamId}:`, stats);
        const message = JSON.stringify({ type: 'stats', stats });
        clients.forEach((client) => {
          if (client.readyState === 1) {
            client.send(message);
          }
        });
      }
    }
  }, 3000);
};

export default { initWebSocket };
