
'use client';

import Link from 'next/link';

const quickActions = [
  {
    title: 'Membership Management',
    description: 'Add, edit, and manage church members',
    icon: 'ri-group-line',
    href: '/membership',
    color: 'bg-blue-500',
    stats: '248 Active Members'
  },
  {
    title: 'Sermon Library',
    description: 'Upload, organize, and manage sermons',
    icon: 'ri-book-open-line',
    href: '/sermons',
    color: 'bg-green-500',
    stats: '156 Sermons'
  },
  {
    title: 'Live Streaming',
    description: 'Broadcast services to online congregation',
    icon: 'ri-live-line',
    href: '/live',
    color: 'bg-red-500',
    stats: 'Go Live Now'
  },
  {
    title: 'Event Management',
    description: 'Plan and organize church events',
    icon: 'ri-calendar-event-line',
    href: '/events',
    color: 'bg-purple-500',
    stats: '8 Upcoming Events'
  },
  {
    title: 'Announcements',
    description: 'Share important updates with congregation',
    icon: 'ri-megaphone-line',
    href: '/announcements',
    color: 'bg-orange-500',
    stats: '3 Active'
  },
  {
    title: 'Forms Management',
    description: 'Create and manage registration forms',
    icon: 'ri-file-list-line',
    href: '/forms',
    color: 'bg-teal-500',
    stats: '12 Forms'
  }
];

export default function QuickAccessPanel() {
  return (
    <div className="bg-white overflow-hidden shadow-sm rounded-lg">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Quick Access</h3>
        <p className="mt-1 text-sm text-gray-500">
          Manage your church operations efficiently
        </p>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickActions.map((action) => (
            <Link
              key={action.title}
              href={action.href}
              className="relative group bg-white p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-center">
                <div className={`${action.color} w-10 h-10 flex items-center justify-center rounded-lg flex-shrink-0`}>
                  <i className={`${action.icon} text-white text-lg`}></i>
                </div>
                <div className="ml-4 flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 truncate">
                    {action.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {action.description}
                  </p>
                  <p className="text-xs text-blue-600 font-medium mt-1 truncate">
                    {action.stats}
                  </p>
                </div>
                <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 ml-2">
                  <i className="ri-arrow-right-line text-gray-400 group-hover:text-blue-600"></i>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
