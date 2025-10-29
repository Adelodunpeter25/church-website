


import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import DashboardHeader from '@/components/DashboardHeader';
import EventCalendar from './EventCalendar';
import EventList from './EventList';
import CreateEventModal from './CreateEventModal';

export default function EventsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
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

            <div className="mt-8">
              {viewMode === 'calendar' ? <EventCalendar /> : <EventList />}
            </div>
          </div>
        </main>
      </div>

      <CreateEventModal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} />
    </div>
  );
}
