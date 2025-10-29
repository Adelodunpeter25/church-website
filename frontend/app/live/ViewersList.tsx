
'use client';

import { useState } from 'react';

const viewers = [
  { id: 1, name: 'Sarah Johnson', joinTime: '10:30 AM', location: 'New York', status: 'active', isBanned: false },
  { id: 2, name: 'Michael Brown', joinTime: '10:32 AM', location: 'California', status: 'active', isBanned: false },
  { id: 3, name: 'Emily Davis', joinTime: '10:35 AM', location: 'Texas', status: 'active', isBanned: false },
  { id: 4, name: 'David Wilson', joinTime: '10:36 AM', location: 'Florida', status: 'active', isBanned: false },
  { id: 5, name: 'Jennifer Martinez', joinTime: '10:38 AM', location: 'Ohio', status: 'active', isBanned: false },
  { id: 6, name: 'Robert Taylor', joinTime: '10:40 AM', location: 'Illinois', status: 'active', isBanned: false },
  { id: 7, name: 'Lisa Anderson', joinTime: '10:42 AM', location: 'Michigan', status: 'active', isBanned: true }
];

export default function ViewersList() {
  const [viewerList, setViewerList] = useState(viewers);
  const [showActions, setShowActions] = useState<number | null>(null);

  const handleKickUser = (userId: number) => {
    setViewerList(prev => prev.filter(viewer => viewer.id !== userId));
    setShowActions(null);
  };

  const handleBanUser = (userId: number) => {
    setViewerList(prev => prev.map(viewer => 
      viewer.id === userId 
        ? { ...viewer, isBanned: true, status: 'banned' }
        : viewer
    ));
    setShowActions(null);
  };

  const handleUnbanUser = (userId: number) => {
    setViewerList(prev => prev.map(viewer => 
      viewer.id === userId 
        ? { ...viewer, isBanned: false, status: 'active' }
        : viewer
    ));
    setShowActions(null);
  };

  const activeViewers = viewerList.filter(v => !v.isBanned);
  const bannedViewers = viewerList.filter(v => v.isBanned);

  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Connected Listeners</h3>
        <p className="text-sm text-gray-500">
          {activeViewers.length} active • {bannedViewers.length} banned
        </p>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        <div className="px-6 py-3 bg-gray-50 border-b border-gray-100">
          <h4 className="text-sm font-medium text-gray-700">Active Listeners</h4>
        </div>
        
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
                  <div className="text-xs text-gray-500">{viewer.location}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-xs text-gray-500">
                  {viewer.joinTime}
                </div>
                <div className="relative">
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
      
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">
            Stream started at 10:30 AM
          </span>
          <button className="text-blue-600 hover:text-blue-500 cursor-pointer whitespace-nowrap">
            Export listener log
            <i className="ml-1 ri-download-line"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
