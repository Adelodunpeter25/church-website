


import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useMemberDashboard } from '@/hooks/useMemberDashboard';
import { useLivestream } from '@/hooks/useLivestream';
import EventRegistrationModal from '@/components/modals/EventRegistrationModal';
import EventDetailsModal from '@/components/modals/EventDetailsModal';
import ConfirmDialog from '@/components/modals/ConfirmDialog';
import AddPrayerRequestModal from '@/components/modals/AddPrayerRequestModal';
import PrayerRequestDetailsModal from '@/components/modals/PrayerRequestDetailsModal';
import LiveStreamPlayer from '@/components/livestream/LiveStreamPlayer';
import LiveStreamInfo from '@/components/livestream/LiveStreamInfo';
import LiveStreamChat from '@/components/livestream/LiveStreamChat';

export default function MemberDashboard() {
  const { user } = useAuth();
  const { stats, recentSermons, upcomingEvents, loading } = useMemberDashboard(user?.id || '');
  const { getCurrentLivestream, getStreamStats } = useLivestream();
  const [activeTab, setActiveTab] = useState('overview');
  const [currentStream, setCurrentStream] = useState<any>(null);
  const [streamStats, setStreamStats] = useState<any>(null);
  const [loadingStream, setLoadingStream] = useState(false);

  useEffect(() => {
    if (activeTab === 'livestream') {
      loadLivestream();
    }
  }, [activeTab]);

  const loadLivestream = async () => {
    setLoadingStream(true);
    try {
      const stream = await getCurrentLivestream();
      if (stream && stream.id) {
        setCurrentStream(stream);
        const stats = await getStreamStats(stream.id);
        setStreamStats(stats);
      } else {
        setCurrentStream(null);
        setStreamStats(null);
      }
    } catch (error) {
      console.error('Error loading livestream:', error);
      setCurrentStream(null);
    } finally {
      setLoadingStream(false);
    }
  };
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [showPrayerModal, setShowPrayerModal] = useState(false);
  const [showPrayerDetailsModal, setShowPrayerDetailsModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [selectedPrayerRequest, setSelectedPrayerRequest] = useState<any>(null);
  const [sermonSearchTerm, setSermonSearchTerm] = useState('');

  const sermons = [
    { title: 'Walking in Faith - Part 3', speaker: 'Pastor John', date: 'Jan 14, 2025', duration: '42 min', plays: 156 },
    { title: 'The Power of Prayer', speaker: 'Pastor Sarah', date: 'Jan 7, 2025', duration: '38 min', plays: 203 },
    { title: 'Love Your Neighbor', speaker: 'Pastor John', date: 'Dec 31, 2023', duration: '45 min', plays: 189 },
    { title: 'Hope in Difficult Times', speaker: 'Pastor David', date: 'Dec 24, 2023', duration: '35 min', plays: 245 }
  ];

  const filteredSermons = sermons.filter(sermon => {
    const search = sermonSearchTerm.toLowerCase();
    return sermon.title.toLowerCase().includes(search) ||
           sermon.speaker.toLowerCase().includes(search) ||
           sermon.date.toLowerCase().includes(search);
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="text-xl sm:text-2xl font-bold text-blue-600" style={{ fontFamily: "Pacifico, serif" }}>
                Bibleway
              </div>
              <span className="ml-2 sm:ml-4 text-sm sm:text-base text-gray-600 hidden sm:inline">Member Portal</span>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 cursor-pointer">
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-notification-2-line"></i>
                </div>
              </button>
              <Link to="/landing" className="text-xs sm:text-sm text-gray-600 hover:text-gray-900 cursor-pointer">
                Sign Out
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Welcome back, {user?.name?.split(' ')[0] || 'Member'}!</h1>
          <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600">Stay connected with your church community</p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6 sm:mb-8">
          <div className="sm:border-b border-gray-200">
            <nav className="grid grid-cols-3 gap-2 sm:gap-0 sm:flex sm:space-x-8 p-4 sm:px-6 sm:py-0">
              {[
                { id: 'overview', label: 'Overview', icon: 'ri-dashboard-line' },
                { id: 'livestream', label: 'Live Stream', icon: 'ri-live-line' },
                { id: 'sermons', label: 'Sermons', icon: 'ri-book-open-line' },
                { id: 'events', label: 'Events', icon: 'ri-calendar-line' },
                { id: 'giving', label: 'Giving', icon: 'ri-hand-heart-line' },
                { id: 'prayer', label: 'Prayer Requests', icon: 'ri-heart-line' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col sm:flex-row items-center justify-center sm:justify-start py-3 sm:py-4 px-1 border sm:border-0 border-b-2 rounded-lg sm:rounded-none font-semibold text-xs sm:text-sm cursor-pointer transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600 bg-blue-50'
                      : 'border-gray-300 sm:border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                  }`}
                >
                  <i className={`${tab.icon} sm:mr-2 text-lg sm:text-base`}></i>
                  <span className="mt-1 sm:mt-0 text-center">{tab.label.split(' ')[0]}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-4 sm:p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {loading ? (
                  <div className="text-center py-12">Loading...</div>
                ) : (
                  <>
                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                      <div className="bg-blue-50 rounded-lg p-6">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <i className="ri-calendar-check-line text-blue-600 text-xl"></i>
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-blue-600">Attendance This Year</p>
                            <p className="text-2xl font-bold text-blue-900">{stats.attendanceThisYear} Services</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-green-50 rounded-lg p-6">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <i className="ri-hand-heart-line text-green-600 text-xl"></i>
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-green-600">Total Giving</p>
                            <p className="text-2xl font-bold text-green-900">₦{stats.totalGiving.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-purple-50 rounded-lg p-6">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                            <i className="ri-group-line text-purple-600 text-xl"></i>
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-purple-600">Events Attended</p>
                            <p className="text-2xl font-bold text-purple-900">{stats.eventsAttended} Events</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Sermons</h3>
                        <div className="space-y-4">
                          {recentSermons.length > 0 ? recentSermons.map((sermon: any) => (
                            <div key={sermon.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div>
                                <p className="font-medium text-gray-900">{sermon.title}</p>
                                <p className="text-sm text-gray-500">{new Date(sermon.date).toLocaleDateString()}</p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs text-gray-500">{sermon.duration}</span>
                                <button className="text-blue-600 hover:text-blue-800 cursor-pointer">
                                  <i className="ri-play-line"></i>
                                </button>
                              </div>
                            </div>
                          )) : (
                            <p className="text-gray-500 text-center py-4">No recent sermons</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
                        <div className="space-y-4">
                          {upcomingEvents.length > 0 ? upcomingEvents.map((event: any) => (
                            <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div>
                                <p className="font-medium text-gray-900">{event.title}</p>
                                <p className="text-sm text-gray-500">{new Date(event.date).toLocaleDateString()}</p>
                              </div>
                              <div>
                                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                  {event.type}
                                </span>
                              </div>
                            </div>
                          )) : (
                            <p className="text-gray-500 text-center py-4">No upcoming events</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {activeTab === 'livestream' && (
              <div>
                {loadingStream ? (
                  <div className="text-center py-12">Loading stream...</div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                    <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                      <LiveStreamPlayer 
                        isLive={currentStream?.is_live || false} 
                        title={currentStream?.title}
                        streamUrl={currentStream?.stream_url}
                      />
                      <LiveStreamInfo 
                        isLive={currentStream?.is_live || false} 
                        viewers={streamStats?.current_viewers || 0} 
                      />
                    </div>
                    <div>
                      <LiveStreamChat streamId={currentStream?.id} />
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'sermons' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Sermon Library</h3>
                  <div className="relative">
                    <input
                      type="text"
                      value={sermonSearchTerm}
                      onChange={(e) => setSermonSearchTerm(e.target.value)}
                      placeholder="Search sermons..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <i className="ri-search-line absolute left-3 top-2.5 text-gray-400 text-sm"></i>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {filteredSermons.length > 0 ? filteredSermons.map((sermon, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-2">{sermon.title}</h4>
                          <p className="text-sm text-gray-600 mb-1">by {sermon.speaker}</p>
                          <p className="text-sm text-gray-500">{sermon.date} • {sermon.duration}</p>
                        </div>
                        <button className="text-blue-600 hover:text-blue-800 cursor-pointer">
                          <i className="ri-bookmark-line"></i>
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">{sermon.plays} plays</span>
                        <div className="flex space-x-2">
                          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm cursor-pointer whitespace-nowrap">
                            <i className="ri-play-line mr-2"></i>
                            Play
                          </button>
                          <button className="text-gray-600 hover:text-gray-800 px-3 py-2 border border-gray-300 rounded-lg cursor-pointer">
                            <i className="ri-download-line"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  )) : (
                    <div className="col-span-2 text-center py-12">
                      <i className="ri-search-line text-4xl text-gray-300 mb-2"></i>
                      <p className="text-gray-500">No sermons found matching "{sermonSearchTerm}"</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'events' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Events</h3>
                  <div className="flex space-x-2">
                    <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer whitespace-nowrap">
                      Registered
                    </button>
                    <button className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer whitespace-nowrap">
                      All Events
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { title: 'Youth Spring Retreat', date: 'March 15-17, 2025', location: 'Mountain View Camp', status: 'Registered', type: 'Retreat' },
                    { title: 'Community Food Drive', date: 'March 22, 2025', location: 'Church Main Hall', status: 'Registered', type: 'Service' },
                    { title: 'Easter Celebration Service', date: 'March 31, 2025', location: 'Main Sanctuary', status: 'Available', type: 'Worship' },
                    { title: 'Marriage Enrichment Seminar', date: 'April 5-6, 2025', location: 'Fellowship Hall', status: 'Available', type: 'Seminar' }
                  ].map((event, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <h4 className="font-semibold text-gray-900">{event.title}</h4>
                            <span className={`ml-3 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              event.status === 'Registered' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {event.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">
                            <i className="ri-calendar-line mr-2"></i>
                            {event.date}
                          </p>
                          <p className="text-sm text-gray-600">
                            <i className="ri-map-pin-line mr-2"></i>
                            {event.location}
                          </p>
                        </div>
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                          {event.type}
                        </span>
                      </div>
                      <div className="flex space-x-3">
                        {event.status === 'Registered' ? (
                          <>
                            <button 
                              onClick={() => {
                                setSelectedEvent(event);
                                setShowDetailsModal(true);
                              }}
                              className="text-blue-600 hover:text-blue-800 text-sm cursor-pointer whitespace-nowrap"
                            >
                              View Details
                            </button>
                            <button 
                              onClick={() => {
                                setSelectedEvent(event);
                                setShowCancelConfirm(true);
                              }}
                              className="text-red-600 hover:text-red-800 text-sm cursor-pointer whitespace-nowrap"
                            >
                              Cancel Registration
                            </button>
                          </>
                        ) : (
                          <>
                            <button 
                              onClick={() => {
                                setSelectedEvent(event);
                                setShowRegistrationModal(true);
                              }}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm cursor-pointer whitespace-nowrap"
                            >
                              Register
                            </button>
                            <button 
                              onClick={() => {
                                setSelectedEvent(event);
                                setShowDetailsModal(true);
                              }}
                              className="text-blue-600 hover:text-blue-800 text-sm cursor-pointer whitespace-nowrap"
                            >
                              Learn More
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'giving' && (
              <div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                  <div className="lg:col-span-2">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Giving History</h3>
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                      <table className="min-w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Method</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {[
                            { date: 'Jan 14, 2025', type: 'Tithe', amount: '$250', method: 'Online' },
                            { date: 'Jan 7, 2025', type: 'Tithe', amount: '$250', method: 'Online' },
                            { date: 'Dec 31, 2023', type: 'Special Offering', amount: '$100', method: 'Cash' },
                            { date: 'Dec 24, 2023', type: 'Tithe', amount: '$250', method: 'Online' }
                          ].map((giving, index) => (
                            <tr key={index}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{giving.date}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{giving.type}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">{giving.amount}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{giving.method}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Give</h3>
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Giving Type</label>
                          <select className="w-full pr-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>Tithe</option>
                            <option>Offering</option>
                            <option>Missions</option>
                            <option>Building Fund</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                          <input
                            type="number"
                            placeholder="$0.00"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {['$50', '$100', '$250'].map((amount) => (
                            <button key={amount} className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                              {amount}
                            </button>
                          ))}
                        </div>
                        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold cursor-pointer whitespace-nowrap">
                          Give Now
                        </button>
                      </div>
                    </div>

                    <div className="mt-6 bg-blue-50 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900 mb-2">2025 Giving Summary</h4>
                      <p className="text-sm text-blue-700">Total Given: <span className="font-bold">$2,450</span></p>
                      <p className="text-xs text-blue-600 mt-1">Tax statement available in January</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'prayer' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Prayer Requests</h3>
                  <button 
                    onClick={() => setShowPrayerModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm cursor-pointer whitespace-nowrap"
                  >
                    Add Prayer Request
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">My Prayer Requests</h4>
                    <div className="space-y-4">
                      {[
                        { title: 'Health and healing for my mother', date: 'Jan 10, 2025', status: 'Active', prayers: 24 },
                        { title: 'Job interview success', date: 'Dec 15, 2023', status: 'Answered', prayers: 18 },
                        { title: 'Guidance in life decisions', date: 'Nov 28, 2023', status: 'Active', prayers: 31 }
                      ].map((request, index) => (
                        <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h5 className="font-medium text-gray-900 mb-1">{request.title}</h5>
                              <p className="text-sm text-gray-500">{request.date}</p>
                            </div>
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              request.status === 'Answered' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {request.status}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">{request.prayers} people praying</span>
                            <button 
                              onClick={() => {
                                setSelectedPrayerRequest(request);
                                setShowPrayerDetailsModal(true);
                              }}
                              className="text-blue-600 hover:text-blue-800 text-sm cursor-pointer"
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">Community Prayer Wall</h4>
                    <div className="space-y-4">
                      {[
                        { title: 'Prayers for our church building project', author: 'Pastor David', date: 'Jan 12, 2025', prayers: 67 },
                        { title: 'Healing for the Johnson family', author: 'Mary S.', date: 'Jan 11, 2025', prayers: 43 },
                        { title: 'Safe travels for missions team', author: 'Youth Ministry', date: 'Jan 9, 2025', prayers: 29 }
                      ].map((request, index) => (
                        <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                          <div className="mb-3">
                            <h5 className="font-medium text-gray-900 mb-1">{request.title}</h5>
                            <p className="text-sm text-gray-500">by {request.author} • {request.date}</p>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">{request.prayers} prayers</span>
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm cursor-pointer whitespace-nowrap">
                              <i className="ri-heart-line mr-1"></i>
                              Pray
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedEvent && (
        <>
          <EventRegistrationModal
            isOpen={showRegistrationModal}
            onClose={() => setShowRegistrationModal(false)}
            eventTitle={selectedEvent.title}
          />
          
          <EventDetailsModal
            isOpen={showDetailsModal}
            onClose={() => setShowDetailsModal(false)}
            event={selectedEvent}
          />

          <ConfirmDialog
            isOpen={showCancelConfirm}
            onClose={() => setShowCancelConfirm(false)}
            onConfirm={() => {
              console.log('Cancelling registration for:', selectedEvent.title);
            }}
            title="Cancel Registration"
            message={`Are you sure you want to cancel your registration for "${selectedEvent.title}"?`}
            confirmText="Cancel Registration"
            type="warning"
          />
        </>
      )}

      <AddPrayerRequestModal
        isOpen={showPrayerModal}
        onClose={() => setShowPrayerModal(false)}
      />

      <PrayerRequestDetailsModal
        isOpen={showPrayerDetailsModal}
        onClose={() => setShowPrayerDetailsModal(false)}
        request={selectedPrayerRequest}
      />
    </div>
  );
}
