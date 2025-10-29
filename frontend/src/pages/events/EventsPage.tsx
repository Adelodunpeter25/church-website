


import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import DashboardHeader from '@/components/DashboardHeader';
import EventCalendar from './EventCalendar';
import EventList from './EventList';
import CreateEventModal from './CreateEventModal';
import EventCard from '@/components/EventCard';
import EditEventModal from '@/components/EditEventModal';
import ManageAttendeesModal from '@/components/ManageAttendeesModal';
import ConfirmDialog from '@/components/ConfirmDialog';

const upcomingEvents = [
  {
    id: 1,
    title: 'Sunday Worship Service',
    date: '2025-01-19',
    time: '10:00 AM - 12:00 PM',
    location: 'Main Sanctuary',
    category: 'Worship',
    attendees: 250,
    description: 'Join us for our weekly worship service with praise, worship, and a powerful message.'
  },
  {
    id: 2,
    title: 'Youth Group Meeting',
    date: '2025-01-20',
    time: '6:00 PM - 8:00 PM',
    location: 'Youth Center',
    category: 'Youth',
    attendees: 45,
    description: 'Weekly youth gathering with games, worship, and Bible study for ages 13-18.'
  },
  {
    id: 3,
    title: 'Community Outreach',
    date: '2025-01-22',
    time: '9:00 AM - 2:00 PM',
    location: 'Downtown Area',
    category: 'Outreach',
    attendees: 30,
    description: 'Serve our community by distributing food and sharing God\'s love.'
  }
];

export default function EventsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showManageAttendees, setShowManageAttendees] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [eventToDelete, setEventToDelete] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="lg:pl-72">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-2xl font-bold text-gray-900">Event Management</h1>
                <p className="mt-2 text-sm text-gray-700">
                  Plan, organize, and manage church events and activities.
                </p>
              </div>
              <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none flex items-center space-x-3">
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('calendar')}
                    className={`px-3 py-1 rounded text-sm cursor-pointer whitespace-nowrap ${viewMode === 'calendar' ? 'bg-white shadow-sm' : ''}`}
                  >
                    Calendar
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-3 py-1 rounded text-sm cursor-pointer whitespace-nowrap ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
                  >
                    List
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(true)}
                  className="block rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-add-line mr-2"></i>
                  New Event
                </button>
              </div>
            </div>

            <div className="mt-8 space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      onEdit={(id) => {
                        setSelectedEvent(id);
                        setShowEditModal(true);
                      }}
                      onDelete={(id) => {
                        setEventToDelete(id);
                        setShowDeleteConfirm(true);
                      }}
                      onManageAttendees={(id) => {
                        setSelectedEvent(id);
                        setShowManageAttendees(true);
                      }}
                    />
                  ))}
                </div>
              </div>
              
              <div>
                {viewMode === 'calendar' ? <EventCalendar /> : <EventList />}
              </div>
            </div>
          </div>
        </main>
      </div>

      <CreateEventModal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} />
      
      {selectedEvent && (
        <>
          <EditEventModal
            isOpen={showEditModal}
            onClose={() => setShowEditModal(false)}
            eventId={selectedEvent}
          />
          <ManageAttendeesModal
            isOpen={showManageAttendees}
            onClose={() => setShowManageAttendees(false)}
            eventId={selectedEvent}
          />
        </>
      )}
      
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={() => {
          console.log('Deleting event:', eventToDelete);
        }}
        title="Delete Event"
        message="Are you sure you want to delete this event? This action cannot be undone."
        confirmText="Delete"
        type="danger"
      />
    </div>
  );
}
