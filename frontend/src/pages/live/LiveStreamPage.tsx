


import { useState, useEffect } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import DashboardHeader from '@/components/layout/DashboardHeader';
import StreamControls from './StreamControls';
import ViewersList from './ViewersList';
import StreamStats from './StreamStats';
import { useLivestream } from '@/hooks/useLivestream';

export default function LiveStreamPage() {
  const { getCurrentLivestream, createLivestream, endLivestream, getStreamHistory } = useLivestream();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const [viewerCount, setViewerCount] = useState(0);
  const [currentStreamId, setCurrentStreamId] = useState<number | null>(null);
  const [streamHistory, setStreamHistory] = useState<any[]>([]);
  const [streamStats, setStreamStats] = useState({
    current_viewers: 0,
    peak_viewers: 0,
    duration: 0,
    chat_messages: 0
  });
  const [streamSettings, setStreamSettings] = useState({
    title: 'Sunday Morning Service - Live Audio',
    quality: 'high',
    category: 'Sunday Service',
    autoRecord: true,
    description: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCurrentStream();
    loadStreamHistory();
  }, []);

  useEffect(() => {
    if (currentStreamId && isLive) {
      const interval = setInterval(loadStreamStats, 5000);
      return () => clearInterval(interval);
    }
  }, [currentStreamId, isLive]);

  const loadCurrentStream = async () => {
    try {
      const stream = await getCurrentLivestream();
      if (stream && stream.id) {
        setIsLive(true);
        setViewerCount(stream.viewers || 0);
        setCurrentStreamId(stream.id);
        loadStreamStats();
      } else {
        setIsLive(false);
        setCurrentStreamId(null);
      }
    } catch (error) {
      setIsLive(false);
      setCurrentStreamId(null);
    }
  };

  const loadStreamHistory = async () => {
    try {
      const history = await getStreamHistory();
      setStreamHistory(history);
    } catch (error) {
      console.error('Error loading stream history:', error);
    }
  };

  const loadStreamStats = async () => {
    if (!currentStreamId) return;
    try {
      const stats = await useLivestream().getStreamStats(currentStreamId);
      setStreamStats(stats);
      setViewerCount(stats.current_viewers);
    } catch (error) {
      console.error('Error loading stream stats:', error);
    }
  };

  const handleToggleLive = async (live: boolean) => {
    setLoading(true);
    try {
      if (live) {
        const stream = await createLivestream({
          title: streamSettings.title,
          description: streamSettings.description,
          stream_url: null
        });
        setCurrentStreamId(stream.id);
        setIsLive(true);
        loadStreamStats();
      } else {
        if (currentStreamId) {
          await endLivestream(currentStreamId);
          setCurrentStreamId(null);
          setIsLive(false);
          loadStreamHistory();
        }
      }
    } finally {
      setLoading(false);
    }
  };

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

            <StreamStats isLive={isLive} stats={streamStats} />

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
                  
                  <StreamControls isLive={isLive} onToggleLive={handleToggleLive} loading={loading} />
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
                        value={streamSettings.title}
                        onChange={(e) => setStreamSettings(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Audio Quality
                      </label>
                      <select 
                        value={streamSettings.quality}
                        onChange={(e) => setStreamSettings(prev => ({ ...prev, quality: e.target.value }))}
                        className="w-full pr-8 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="high">High Quality (128kbps)</option>
                        <option value="standard">Standard (96kbps)</option>
                        <option value="low">Low Bandwidth (64kbps)</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <select 
                        value={streamSettings.category}
                        onChange={(e) => setStreamSettings(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full pr-8 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
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
                      <select 
                        value={streamSettings.autoRecord ? 'yes' : 'no'}
                        onChange={(e) => setStreamSettings(prev => ({ ...prev, autoRecord: e.target.value === 'yes' }))}
                        className="w-full pr-8 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="yes">Yes - Save for library</option>
                        <option value="no">No - Live only</option>
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
                      value={streamSettings.description}
                      onChange={(e) => setStreamSettings(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Describe what's happening in this audio stream..."
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <ViewersList streamId={currentStreamId} />
                
                <div className="bg-white shadow-sm rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Stream History</h3>
                  <div className="space-y-3">
                    {streamHistory.length > 0 ? (
                      streamHistory.map((stream) => {
                        const duration = stream.end_time && stream.start_time 
                          ? new Date(stream.end_time).getTime() - new Date(stream.start_time).getTime()
                          : 0;
                        const hours = Math.floor(duration / 3600000);
                        const minutes = Math.floor((duration % 3600000) / 60000);
                        const seconds = Math.floor((duration % 60000) / 1000);
                        const durationStr = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                        
                        return (
                          <div key={stream.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <div className="text-sm font-medium">{stream.title}</div>
                              <div className="text-xs text-gray-500">
                                {new Date(stream.start_time).toLocaleDateString()} • {durationStr}
                              </div>
                            </div>
                            <div className="text-sm text-gray-500">{stream.viewers || 0} viewers</div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-center py-4 text-gray-500 text-sm">No stream history yet</div>
                    )}
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
