class LivestreamWebSocket {
  private ws: WebSocket | null = null;
  private reconnectTimeout: number | null = null;
  private heartbeatInterval: number | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 10;
  private streamId: string | null = null;
  private onStatsUpdate: ((stats: any) => void) | null = null;
  private isIntentionallyClosed = false;

  connect(streamId: string, onStatsUpdate: (stats: any) => void) {
    this.streamId = streamId;
    this.onStatsUpdate = onStatsUpdate;
    this.createConnection();
  }

  private createConnection() {
    if (this.ws?.readyState === WebSocket.OPEN) return;

    const wsUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:5001';
    this.ws = new WebSocket(wsUrl);

    this.ws.onopen = () => {
      console.log('WebSocket connected');
      this.reconnectAttempts = 0;
      this.startHeartbeat();
      if (this.streamId) {
        this.send({ type: 'subscribe', streamId: this.streamId });
      }
    };

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'stats' && this.onStatsUpdate) {
          this.onStatsUpdate(data.stats);
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    this.ws.onerror = (error) => {
      console.error('LivestreamWebSocket error:', error);
    };

    this.ws.onclose = () => {
      console.log('WebSocket closed');
      this.stopHeartbeat();
      if (!this.isIntentionallyClosed) {
        this.attemptReconnect();
      }
    };
  }

  private attemptReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Max reconnection attempts reached');
      return;
    }

    const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);
    this.reconnectAttempts++;
    console.log(`Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts})`);

    this.reconnectTimeout = window.setTimeout(() => {
      this.createConnection();
    }, delay);
  }

  private startHeartbeat() {
    this.stopHeartbeat();
    this.heartbeatInterval = window.setInterval(() => {
      if (this.ws?.readyState === WebSocket.OPEN) {
        this.send({ type: 'ping' });
      }
    }, 30000);
  }

  private stopHeartbeat() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }

  send(data: any) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    }
  }

  disconnect() {
    this.isIntentionallyClosed = true;
    this.stopHeartbeat();
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.streamId = null;
    this.onStatsUpdate = null;
    this.reconnectAttempts = 0;
    this.isIntentionallyClosed = false;
  }
}

export default new LivestreamWebSocket();
