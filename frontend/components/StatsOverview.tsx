
'use client';

const stats = [
  {
    name: 'Total Members',
    value: '248',
    change: '+12',
    changeType: 'increase',
    icon: 'ri-group-line'
  },
  {
    name: 'This Week\'s Attendance',
    value: '187',
    change: '+5%',
    changeType: 'increase',
    icon: 'ri-user-heart-line'
  },
  {
    name: 'Sermon Downloads',
    value: '1,234',
    change: '+23%',
    changeType: 'increase',
    icon: 'ri-download-line'
  },
  {
    name: 'Active Live Viewers',
    value: '89',
    change: 'Live now',
    changeType: 'live',
    icon: 'ri-live-line'
  }
];

export default function StatsOverview() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((item) => (
        <div key={item.name} className="bg-white overflow-hidden shadow-sm rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-lg">
                  <i className={`${item.icon} text-blue-600 text-lg`}></i>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {item.name}
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {item.value}
                    </div>
                    <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                      item.changeType === 'increase'
                        ? 'text-green-600'
                        : item.changeType === 'live'
                        ? 'text-red-600'
                        : 'text-red-600'
                    }`}>
                      {item.changeType === 'increase' && (
                        <i className="ri-arrow-up-line text-xs mr-1"></i>
                      )}
                      {item.changeType === 'live' && (
                        <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                      )}
                      {item.change}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
