import { useState, useEffect, useRef } from 'react';
import { useLivestream } from '@/hooks/useLivestream';
import { useAuth } from '@/context/AuthContext';

interface LiveStreamChatProps {
  streamId: string | null;
  isLive: boolean;
  showDeleteButton?: boolean;
}

export default function LiveStreamChat({ streamId, isLive, showDeleteButton = false }: LiveStreamChatProps) {
  const { getChatMessages, deleteChatMessage } = useLivestream();
  const { user } = useAuth();
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (streamId && isLive) {
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
  }, [streamId, isLive]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadMessages = async () => {
    if (!streamId) return;
    try {
      const data = await getChatMessages(streamId, 50);
      setMessages(data);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !streamId || !user || !wsRef.current) return;
    if (wsRef.current.readyState !== WebSocket.OPEN) return;

    setSending(true);
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
    } finally {
      setSending(false);
    }
  };

  const handleDeleteMessage = async (messageId: string) => {
    if (!streamId) return;
    try {
      await deleteChatMessage(streamId, messageId);
      setMessages(prev => prev.filter(msg => msg.id !== messageId));
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  if (!isLive) {
    return (
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Live Chat</h3>
        <div className="text-center py-8 text-gray-500 text-sm">
          Chat is only available during live streams
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-sm rounded-lg flex flex-col" style={{ height: '400px' }}>
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Live Chat</h3>
        <p className="text-sm text-gray-500">{messages.length} messages</p>
      </div>

      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
        {messages.map((message) => (
          <div key={message.id} className="group flex items-start space-x-2 hover:bg-gray-50 -mx-2 px-2 py-1 rounded">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-semibold text-blue-600">
                {message.user_name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline space-x-2">
                <span className="text-sm font-medium text-gray-900">{message.user_name}</span>
                <span className="text-xs text-gray-500">
                  {new Date(message.created_at).toLocaleTimeString()}
                </span>
              </div>
              <p className="text-sm text-gray-700 break-words">{message.text}</p>
            </div>
            {showDeleteButton && (
              <button
                onClick={() => handleDeleteMessage(message.id)}
                className="opacity-0 group-hover:opacity-100 p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-opacity"
                title="Delete message"
              >
                <i className="ri-delete-bin-line text-sm"></i>
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="px-6 py-4 border-t border-gray-200">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={sending}
          />
          <button
            type="submit"
            disabled={sending || !newMessage.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            {sending ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
}
