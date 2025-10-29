


import { useState } from 'react';
import EditAnnouncementModal from '../../components/EditAnnouncementModal';

interface AnnouncementListProps {
  filterStatus: string;
}

const announcements = [
  {
    id: 1,
    title: 'Christmas Service Schedule',
    content: 'Join us for special Christmas services. Christmas Eve service at 6 PM, Christmas Day service at 10 AM. Bring your family and friends to celebrate the birth of our Savior.',
    author: 'Pastor John Smith',
    publishDate: '2025-01-10',
    expiryDate: '2025-12-26',
    status: 'active',
    priority: 'high',
    views: 234,
    category: 'Service Updates'
  },
  {
    id: 2,
    title: 'Youth Retreat Registration Open',
    content: 'Registration is now open for the annual youth retreat. March 15-17, 2025. Early bird discount available until February 1st. Contact Sarah at youth@church.com for details.',
    author: 'Sarah Johnson',
    publishDate: '2025-01-08',
    expiryDate: '2025-03-01',
    status: 'active',
    priority: 'medium',
    views: 189,
    category: 'Events'
  },
  {
    id: 3,
    title: 'New Bible Study Series Starting',
    content: 'Starting January 24th, we will begin a new 8-week Bible study series on the Book of Romans. Wednesday evenings at 7 PM in the fellowship hall.',
    author: 'Pastor David Wilson',
    publishDate: '2025-01-05',
    expiryDate: '2025-01-24',
    status: 'scheduled',
    priority: 'medium',
    views: 156,
    category: 'Bible Study'
  },
  {
    id: 4,
    title: 'Thanksgiving Service Reminder',
    content: 'Don\'t forget our special Thanksgiving service this Thursday at 10 AM. We\'ll be sharing testimonies of gratitude and enjoying fellowship together.',
    author: 'Admin',
    publishDate: '2023-11-20',
    expiryDate: '2023-11-23',
    status: 'expired',
    priority: 'high',
    views: 423,
    category: 'Service Updates'
  }
];

export default function AnnouncementList({ filterStatus }: AnnouncementListProps) {
  const [expandedAnnouncement, setExpandedAnnouncement] = useState<number | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<number | null>(null);

  const handleEdit = (id: number) => {
    setSelectedAnnouncement(id);
    setShowEditModal(true);
  };

  const handleShare = (id: number) => {
    setSelectedAnnouncement(id);
    setShowShareModal(true);
  };

  const filteredAnnouncements = announcements.filter(announcement => {
    if (filterStatus === 'all') return true;
    return announcement.status === filterStatus;
  });

  const toggleExpanded = (id: number) => {
    setExpandedAnnouncement(expandedAnnouncement === id ? null : id);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'expired': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {filteredAnnouncements.map((announcement) => (
        <div key={announcement.id} className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-3 mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {announcement.title}
                  </h3>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(announcement.priority)}`}>
                    {announcement.priority}
                  </span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(announcement.status)}`}>
                    {announcement.status}
                  </span>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <i className="ri-user-line mr-1"></i>
                    {announcement.author}
                  </div>
                  <div className="flex items-center">
                    <i className="ri-calendar-line mr-1"></i>
                    {new Date(announcement.publishDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <i className="ri-eye-line mr-1"></i>
                    {announcement.views} views
                  </div>
                  <span className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                    {announcement.category}
                  </span>
                </div>

                <p className={`text-gray-700 ${expandedAnnouncement === announcement.id ? '' : 'line-clamp-2'}`}>
                  {announcement.content}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <button
                    onClick={() => toggleExpanded(announcement.id)}
                    className="text-sm font-medium text-blue-600 hover:text-blue-500 cursor-pointer whitespace-nowrap"
                  >
                    {expandedAnnouncement === announcement.id ? 'Show less' : 'Read more'}
                  </button>
                  
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={() => handleEdit(announcement.id)}
                      className="p-2 text-gray-400 hover:text-blue-600 cursor-pointer"
                      title="Edit"
                    >
                      <div className="w-4 h-4 flex items-center justify-center">
                        <i className="ri-edit-line"></i>
                      </div>
                    </button>
                    <button 
                      onClick={() => handleShare(announcement.id)}
                      className="p-2 text-gray-400 hover:text-green-600 cursor-pointer"
                      title="Share"
                    >
                      <div className="w-4 h-4 flex items-center justify-center">
                        <i className="ri-share-line"></i>
                      </div>
                    </button>
                  </div>
                </div>

                {announcement.status === 'active' && (
                  <div className="mt-3 text-sm text-gray-500">
                    <i className="ri-time-line mr-1"></i>
                    Expires on {new Date(announcement.expiryDate).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {filteredAnnouncements.length === 0 && (
        <div className="text-center py-12">
          <i className="ri-megaphone-line text-gray-400 text-4xl mb-4"></i>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No announcements found</h3>
          <p className="text-gray-500">
            {filterStatus === 'all' 
              ? 'Create your first announcement to get started.' 
              : `No ${filterStatus} announcements at the moment.`
            }
          </p>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedAnnouncement && (
        <EditAnnouncementModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          announcementId={selectedAnnouncement}
          announcement={announcements.find(a => a.id === selectedAnnouncement)!}
        />
      )}

      {/* Share Modal */}
      {showShareModal && selectedAnnouncement && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" onClick={() => setShowShareModal(false)}>
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Share Announcement</h3>
                <button onClick={() => setShowShareModal(false)} className="text-gray-400 hover:text-gray-600">
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>
              <div className="space-y-4">
                <p className="text-gray-600">Share this announcement via:</p>
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <i className="ri-mail-line mr-2"></i>
                    Email
                  </button>
                  <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <i className="ri-message-line mr-2"></i>
                    SMS
                  </button>
                  <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <i className="ri-facebook-fill mr-2"></i>
                    Facebook
                  </button>
                  <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <i className="ri-twitter-fill mr-2"></i>
                    Twitter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}


    </div>
  );
}
