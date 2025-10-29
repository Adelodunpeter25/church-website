
'use client';

const activities = [
  {
    id: 1,
    user: 'Pastor John',
    action: 'uploaded new sermon',
    target: 'Walking in Faith - Part 3',
    time: '2 hours ago',
    icon: 'ri-upload-line',
    iconColor: 'text-green-600'
  },
  {
    id: 2,
    user: 'Sarah Thompson',
    action: 'registered for',
    target: 'Youth Retreat 2024',
    time: '4 hours ago',
    icon: 'ri-user-add-line',
    iconColor: 'text-blue-600'
  },
  {
    id: 3,
    user: 'Admin',
    action: 'created new announcement',
    target: 'Christmas Service Schedule',
    time: '6 hours ago',
    icon: 'ri-megaphone-line',
    iconColor: 'text-orange-600'
  },
  {
    id: 4,
    user: 'Michael Davis',
    action: 'downloaded sermon',
    target: 'The Power of Prayer',
    time: '8 hours ago',
    icon: 'ri-download-line',
    iconColor: 'text-purple-600'
  },
  {
    id: 5,
    user: 'Emily Wilson',
    action: 'joined live stream',
    target: 'Sunday Evening Service',
    time: '12 hours ago',
    icon: 'ri-live-line',
    iconColor: 'text-red-600'
  }
];

export default function RecentActivity() {
  return (
    <div className="bg-white overflow-hidden shadow-sm rounded-lg">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Activity</h3>
        <p className="mt-1 text-sm text-gray-500">
          Latest updates and interactions
        </p>
      </div>
      <div className="flow-root">
        <ul className="divide-y divide-gray-200">
          {activities.map((activity) => (
            <li key={activity.id} className="px-6 py-4">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full">
                    <i className={`${activity.icon} ${activity.iconColor} text-sm`}></i>
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">{activity.user}</span>
                    {' '}{activity.action}{' '}
                    <span className="font-medium">{activity.target}</span>
                  </p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="px-6 py-3 bg-gray-50">
        <button className="text-sm font-medium text-blue-600 hover:text-blue-500 cursor-pointer whitespace-nowrap">
          View all activity
          <i className="ml-1 ri-arrow-right-line"></i>
        </button>
      </div>
    </div>
  );
}
