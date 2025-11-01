import { WebSocketServer } from 'ws';
import pool from '../config/database.js';
import { setupNotificationWebSocket } from './notificationWebSocket.js';

let wss = null;
const streamSubscriptions = new Map();

const streamStatusSubscribers = new Set();

export const initWebSocket = (server) => {
  wss = new WebSocketServer({ server });
  setupNotificationWebSocket(wss);

  wss.on('connection', (ws) => {
    ws.isAlive = true;
    
    ws.on('pong', () => {
      ws.isAlive = true;
    });

    ws.on('message', async (message) => {
      try {
        const data = JSON.parse(message);

        if (data.type === 'ping') {
          ws.send(JSON.stringify({ type: 'pong' }));
          return;
        }

        if (data.type === 'subscribe-stream-status') {
          streamStatusSubscribers.add(ws);
        }

        if (data.type === 'subscribe' && data.streamId) {
          ws.streamId = data.streamId;
          
          if (!streamSubscriptions.has(data.streamId)) {
            streamSubscriptions.set(data.streamId, new Set());
          }
          streamSubscriptions.get(data.streamId).add(ws);
          
          const stats = await getStreamStats(data.streamId);
          if (ws.readyState === 1) {
            ws.send(JSON.stringify({ type: 'stats', stats }));
          }
        }

        if (data.type === 'chat-message' && data.streamId) {
          try {
            const result = await pool.query(
              'INSERT INTO chat_messages (livestream_id, user_id, user_name, text) VALUES ($1, $2, $3, $4) RETURNING *',
              [data.streamId, data.userId || null, data.userName, data.text]
            );
            
            const clients = streamSubscriptions.get(data.streamId);
            if (clients) {
              const messageData = JSON.stringify({ type: 'new-message', message: result.rows[0] });
              clients.forEach((client) => {
                if (client.readyState === 1) {
                  try {
                    client.send(messageData);
                  } catch (error) {
                    console.error('Error sending message:', error.message);
                  }
                }
              });
            }
          } catch (error) {
            console.error('Error inserting chat message:', error.message);
          }
        }
      } catch (error) {
        console.error('WebSocket message error:', error);
      }
    });

    ws.on('close', () => {
      streamStatusSubscribers.delete(ws);
      if (ws.streamId && streamSubscriptions.has(ws.streamId)) {
        streamSubscriptions.get(ws.streamId).delete(ws);
        if (streamSubscriptions.get(ws.streamId).size === 0) {
          streamSubscriptions.delete(ws.streamId);
        }
      }
    });

    ws.on('error', (error) => {
      console.error('WebSocket error:', error.message);
    });
  });

  startStatsBroadcast();
  startHeartbeat();
};

const startHeartbeat = () => {
  setInterval(() => {
    wss.clients.forEach((ws) => {
      if (ws.isAlive === false) {
        return ws.terminate();
      }
      ws.isAlive = false;
      ws.ping();
    });
  }, 30000);
};

const getStreamStats = async (streamId, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const stream = await pool.query('SELECT * FROM livestreams WHERE id = $1', [streamId]);
      if (stream.rows.length === 0 || !stream.rows[0].is_live) return null;

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
        const durationResult = await pool.query(
          'SELECT EXTRACT(EPOCH FROM (NOW() - start_time))::INTEGER as duration FROM livestreams WHERE id = $1',
          [streamId]
        );
        duration = durationResult.rows[0]?.duration || 0;
      }

      return {
        current_viewers: parseInt(viewers.rows[0].current_viewers),
        peak_viewers: parseInt(peakViewers.rows[0].peak_viewers) || 0,
        duration: duration,
        chat_messages: parseInt(chatCount.rows[0].chat_messages),
        is_live: stream.rows[0].is_live
      };
    } catch (error) {
      if (i === retries - 1) {
        console.error('Error getting stream stats after retries:', error.message);
        return null;
      }
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
  return null;
};

const startStatsBroadcast = () => {
  setInterval(async () => {
    for (const [streamId, clients] of streamSubscriptions.entries()) {
      const stats = await getStreamStats(streamId);
      if (stats) {
        const message = JSON.stringify({ type: 'stats', stats });
        clients.forEach((client) => {
          if (client.readyState === 1) {
            try {
              client.send(message);
            } catch (error) {
              console.error('Error sending to client:', error.message);
            }
          }
        });
      }
    }
  }, 3000);
};

export const broadcastStreamStatusChange = () => {
  const message = JSON.stringify({ type: 'stream-status-change' });
  streamStatusSubscribers.forEach((client) => {
    if (client.readyState === 1) {
      try {
        client.send(message);
      } catch (error) {
        console.error('Error broadcasting stream status:', error.message);
      }
    }
  });
};

export const broadcastStreamUpdate = () => {
  const message = JSON.stringify({ type: 'stream-update' });
  streamStatusSubscribers.forEach((client) => {
    if (client.readyState === 1) {
      try {
        client.send(message);
      } catch (error) {
        console.error('Error broadcasting stream update:', error.message);
      }
    }
  });
};

export const broadcastViewersUpdate = () => {
  const message = JSON.stringify({ type: 'viewers-update' });
  streamStatusSubscribers.forEach((client) => {
    if (client.readyState === 1) {
      try {
        client.send(message);
      } catch (error) {
        console.error('Error broadcasting viewers update:', error.message);
      }
    }
  });
};

export const broadcastViewerKicked = (userId) => {
  const message = JSON.stringify({ type: 'viewer-kicked', userId });
  streamStatusSubscribers.forEach((client) => {
    if (client.readyState === 1) {
      try {
        client.send(message);
      } catch (error) {
        console.error('Error broadcasting viewer kicked:', error.message);
      }
    }
  });
};

export default { initWebSocket, broadcastStreamStatusChange, broadcastStreamUpdate, broadcastViewersUpdate, broadcastViewerKicked };
