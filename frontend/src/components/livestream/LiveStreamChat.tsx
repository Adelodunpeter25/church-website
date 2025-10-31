import React, { useState, useEffect, useRef } from 'react';
import { useLivestream } from '@/hooks/useLivestream';
import { useAuth } from '@/context/AuthContext';

interface Message {
  id: string;
  user_name: string;
  text: string;
  created_at: string;
}

interface LiveStreamChatProps {
  streamId?: string;
}

export default function LiveStreamChat({ streamId }: LiveStreamChatProps) {
  const { user } = useAuth();
  const { getChatMessages } = useLivestream();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (streamId) {
      loadMessages();
      
      const wsUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:5001';
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;
      
      ws.onopen = () => {
        ws.send(JSON.stringify({ type: 'subscribe', streamId }));
      };
      
      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'new-message') {
            setMessages(prev => [...prev, data.message]);
          }
        } catch (error) {
          console.error('Error parsing message:', error);
        }
      };
      
      return () => {
        ws.close();
      };
    }
  }, [streamId]);

  const loadMessages = async () => {
    if (!streamId) return;
    try {
      const data = await getChatMessages(streamId, 50);
      setMessages(data);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && streamId && user && wsRef.current) {
      try {
        wsRef.current.send(JSON.stringify({
          type: 'chat-message',
          streamId: streamId,
          userId: user.id,
          userName: user.name,
          text: newMessage.trim()
        }));
        setNewMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow flex flex-col h-[400px] sm:h-[500px]">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold">Live Chat</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2 sm:space-y-3">
        {messages.length > 0 ? messages.map((msg) => (
          <div key={msg.id} className="bg-gray-50 rounded-lg p-2 sm:p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-sm">{msg.user_name}</span>
              <span className="text-xs text-gray-500">{new Date(msg.created_at).toLocaleTimeString()}</span>
            </div>
            <p className="text-sm text-gray-700">{msg.text}</p>
          </div>
        )) : (
          <div className="text-center text-gray-500 py-8">
            <p className="text-sm">No messages yet. Be the first to chat!</p>
          </div>
        )}
      </div>
      
      <form onSubmit={handleSend} className="p-3 sm:p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-3 sm:px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <i className="ri-send-plane-fill"></i>
          </button>
        </div>
      </form>
    </div>
  );
}
