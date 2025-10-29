import React, { useState } from 'react';

interface Message {
  id: number;
  user: string;
  text: string;
  time: string;
}

export default function LiveStreamChat() {
  const [messages] = useState<Message[]>([
    { id: 1, user: 'John D.', text: 'Praise the Lord!', time: '10:05 AM' },
    { id: 2, user: 'Sarah M.', text: 'Amen! Great message today', time: '10:07 AM' },
    { id: 3, user: 'Michael K.', text: 'Blessed to be here', time: '10:10 AM' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setNewMessage('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow flex flex-col h-[500px]">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold">Live Chat</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div key={msg.id} className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-sm">{msg.user}</span>
              <span className="text-xs text-gray-500">{msg.time}</span>
            </div>
            <p className="text-sm text-gray-700">{msg.text}</p>
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSend} className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <i className="ri-send-plane-fill"></i>
          </button>
        </div>
      </form>
    </div>
  );
}
