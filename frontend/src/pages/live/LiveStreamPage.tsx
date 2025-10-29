


import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import DashboardHeader from '@/components/DashboardHeader';
import StreamControls from './StreamControls';
import ViewersList from './ViewersList';
import StreamStats from './StreamStats';

export default function LiveStreamPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const [viewerCount, setViewerCount] = useState(89);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="lg:pl-72">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Live Audio Streaming</h1>
              <p className="mt-2 text-sm text-gray-700">
                Broadcast live audio services to your online congregation.
              </p>
            </div>

            <StreamStats isLive={isLive} viewerCount={viewerCount} />

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-blue-900 to-purple-900 relative">
                    {isLive ? (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white">
                          <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                            <i className="ri-mic-line text-3xl"></i>
                            <div className="absolute -inset-2 border-4 border-red-400 rounded-full animate-ping opacity-75"></div>
                          </div>
                          <h3 className="text-2xl font-semibold mb-2">LIVE AUDIO</h3>
                          <p className="text-gray-300 mb-4">Broadcasting to {viewerCount} listeners</p>
                          <div className="flex items-center justify-center space-x-6 text-sm">
                            <div className="flex items-center">
                              <i className="ri-headphone-line mr-2"></i>
                              Audio Quality: High
                            </div>
                            <div className="flex items-center">
                              <i className="ri-signal-wifi-3-line mr-2"></i>
                              Strong Signal
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-gray-400">
                          <i className="ri-mic-off-line text-5xl mb-6"></i>
                          <h3 className="text-2xl font-semibold mb-2">Audio Stream Offline</h3>
                          <p className="mb-4">Ready to broadcast live audio to your congregation</p>
                          <div className="flex items-center justify-center space-x-6 text-sm">
                            <div className="flex items-center">
                              <i className="ri-headphone-line mr-2"></i>
                              Audio Ready
                            </div>
                            <div className="flex items-center">
                              <i className="ri-signal-wifi-3-line mr-2"></i>
                              Connection Ready
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {isLive && (
                      <div className="absolute top-4 left-4 flex items-center space-x-2">
                        <div className="flex items-center bg-red-600 text-white px-3 py-2 rounded-full text-sm font-medium">
                          <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                          LIVE AUDIO
                        </div>
                        <div className="bg-black/50 text-white px-3 py-2 rounded-full text-sm">
                          <i className="ri-headphone-line mr-1"></i>
                          {viewerCount} listeners
                        </div>
                      </div>
                    )}
                    
                    <div className="absolute bottom-4 right-4">
                      <div className="bg-black/30 backdrop-blur-sm rounded-lg p-3">
                        <div className="flex items-center space-x-2 text-white text-sm">
                          <i className="ri-volume-up-line"></i>
                          <div className="w-12 h-1 bg-white/30 rounded-full overflow-hidden">
                            <div className="h-full bg-green-400 rounded-full animate-pulse" style={{width: '75%'}}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <StreamControls isLive={isLive} onToggleLive={setIsLive} />
                </div>

                <div className="mt-6 bg-white shadow-sm rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Audio Stream Settings</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Stream Title
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        defaultValue="Sunday Morning Service - Live Audio"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Audio Quality
                      </label>
                      <select className="w-full pr-8 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>High Quality (128kbps)</option>
                        <option>Standard (96kbps)</option>
                        <option>Low Bandwidth (64kbps)</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <select className="w-full pr-8 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Sunday Service</option>
                        <option>Bible Study</option>
                        <option>Prayer Meeting</option>
                        <option>Special Event</option>
                        <option>Youth Service</option>
                        <option>Worship Night</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Auto Record
                      </label>
                      <select className="w-full pr-8 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Yes - Save for library</option>
                        <option>No - Live only</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      maxLength={500}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Describe what's happening in this audio stream..."
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <ViewersList />
                
                <div className="bg-white shadow-sm rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Stream History</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="text-sm font-medium">Sunday Service</div>
                        <div className="text-xs text-gray-500">Jan 14, 2025 • 1:32:45</div>
                      </div>
                      <div className="text-sm text-gray-500">142 viewers</div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="text-sm font-medium">Prayer Meeting</div>
                        <div className="text-xs text-gray-500">Jan 10, 2025 • 0:45:30</div>
                      </div>
                      <div className="text-sm text-gray-500">67 viewers</div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="text-sm font-medium">Bible Study</div>
                        <div className="text-xs text-gray-500">Jan 7, 2025 • 1:15:20</div>
                      </div>
                      <div className="text-sm text-gray-500">89 viewers</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
