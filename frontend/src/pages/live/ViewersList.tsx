


import { useState, useEffect, useRef } from 'react';
import { useLivestream } from '@/hooks/useLivestream';

interface ViewersListProps {
  streamId: string | null;
  onToggleChat?: () => void;
  showChat?: boolean;
}

export default function ViewersList({ streamId, onToggleChat, showChat }: ViewersListProps) {
  const { getViewers, removeViewer, banViewer, unbanViewer } = useLivestream();
  const [viewerList, setViewerList] = useState<any[]>([]);
  const [showActions, setShowActions] = useState<number | null>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (streamId) {
      loadViewers();
      
      const wsUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:5001';
      const ws = new WebSocket(wsUrl);
      
      ws.onopen = () => {
        ws.send(JSON.stringify({ type: 'subscribe-stream-status' }));
      };
      
      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'viewers-update') {
            loadViewers();
          }
        } catch (error) {
          console.error('Error parsing message:', error);
        }
      };
      
      return () => ws.close();
    }
  }, [streamId]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (actionsRef.current && !actionsRef.current.contains(event.target as Node)) {
        setShowActions(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const loadViewers = async () => {
    if (!streamId) return;
    try {
      const viewers = await getViewers(streamId);
      setViewerList(viewers);
    } catch (error) {
      console.error('Error loading viewers:', error);
    }
  };

  const handleKickUser = async (userId: number) => {
    if (!streamId) return;
    await removeViewer(streamId, userId);
    await loadViewers();
    setShowActions(null);
  };

  const handleBanUser = async (userId: number) => {
    if (!streamId) return;
    await banViewer(streamId, userId);
    await loadViewers();
    setShowActions(null);
  };

  const handleUnbanUser = async (userId: number) => {
    if (!streamId) return;
    await unbanViewer(streamId, userId);
    await loadViewers();
    setShowActions(null);
  };

  const activeViewers = viewerList.filter(v => v.status === 'active');
  const bannedViewers = viewerList.filter(v => v.status === 'banned');

  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Connected Listeners</h3>
            <p className="text-sm text-gray-500">
              {activeViewers.length} active • {bannedViewers.length} banned
            </p>
          </div>
          {onToggleChat && (
            <button
              onClick={onToggleChat}
              className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
            >
              {showChat ? 'Hide Chat' : 'Show Chat'}
            </button>
          )}
        </div>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {activeViewers.length > 0 && (
          <div className="px-6 py-3 bg-gray-50 border-b border-gray-100">
            <h4 className="text-sm font-medium text-gray-700">Active Listeners</h4>
          </div>
        )}
        
        {activeViewers.map((viewer) => (
          <div key={viewer.id} className="px-6 py-3 hover:bg-gray-50 relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img 
                    className="h-8 w-8 rounded-full object-top object-cover" 
                    src={`https://readdy.ai/api/search-image?query=professional%20church%20member%20portrait%20photo%20with%20warm%20friendly%20smile%2C%20diverse%20person%20wearing%20casual%20formal%20attire%20suitable%20for%20church%20community%2C%20clean%20bright%20background%20with%20natural%20lighting&width=100&height=100&seq=viewer${viewer.id}&orientation=squarish`}
                    alt={viewer.name}
                  />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">{viewer.name}</div>
                  <div className="text-xs text-gray-500">{viewer.location || 'Unknown'}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-xs text-gray-500">
                  {new Date(viewer.joined_at).toLocaleTimeString()}
                </div>
                <div className="relative" ref={showActions === viewer.id ? actionsRef : null}>
                  <button
                    onClick={() => setShowActions(showActions === viewer.id ? null : viewer.id)}
                    className="p-1 text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    <div className="w-4 h-4 flex items-center justify-center">
                      <i className="ri-more-2-line"></i>
                    </div>
                  </button>
                  
                  {showActions === viewer.id && (
                    <div className="absolute right-0 mt-1 w-32 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                      <button
                        onClick={() => handleKickUser(viewer.id)}
                        className="w-full px-3 py-2 text-left text-sm text-orange-700 hover:bg-orange-50 cursor-pointer whitespace-nowrap"
                      >
                        <i className="ri-logout-box-line mr-2"></i>
                        Disconnect
                      </button>
                      <button
                        onClick={() => handleBanUser(viewer.id)}
                        className="w-full px-3 py-2 text-left text-sm text-red-700 hover:bg-red-50 cursor-pointer whitespace-nowrap"
                      >
                        <i className="ri-forbid-line mr-2"></i>
                        Ban User
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {bannedViewers.length > 0 && (
          <>
            <div className="px-6 py-3 bg-red-50 border-b border-gray-100 mt-4">
              <h4 className="text-sm font-medium text-red-700">Banned Users</h4>
            </div>
            
            {bannedViewers.map((viewer) => (
              <div key={viewer.id} className="px-6 py-3 bg-red-50/50 relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img 
                        className="h-8 w-8 rounded-full object-top object-cover opacity-50" 
                        src={`https://readdy.ai/api/search-image?query=professional%20church%20member%20portrait%20photo%20with%20warm%20friendly%20smile%2C%20diverse%20person%20wearing%20casual%20formal%20attire%20suitable%20for%20church%20community%2C%20clean%20bright%20background%20with%20natural%20lighting&width=100&height=100&seq=viewer${viewer.id}&orientation=squarish`}
                        alt={viewer.name}
                      />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white">
                        <i className="ri-forbid-line text-xs text-white"></i>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500">{viewer.name}</div>
                      <div className="text-xs text-red-600">Banned</div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleUnbanUser(viewer.id)}
                    className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 cursor-pointer whitespace-nowrap"
                  >
                    Unban
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      
      {activeViewers.length === 0 && bannedViewers.length === 0 && (
        <div className="px-6 py-8 text-center text-gray-500 text-sm">
          No listeners connected yet
        </div>
      )}
    </div>
  );
}
