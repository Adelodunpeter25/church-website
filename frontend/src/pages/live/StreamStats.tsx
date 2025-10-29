


interface StreamStatsProps {
  isLive: boolean;
  viewerCount: number;
}

export default function StreamStats({ isLive, viewerCount }: StreamStatsProps) {
  const stats = [
    {
      name: 'Current Viewers',
      value: viewerCount.toString(),
      change: isLive ? 'Live now' : 'Offline',
      changeType: isLive ? 'live' : 'offline',
      icon: 'ri-eye-line'
    },
    {
      name: 'Peak Viewers Today',
      value: '142',
      change: '+15%',
      changeType: 'increase',
      icon: 'ri-bar-chart-line'
    },
    {
      name: 'Stream Duration',
      value: isLive ? '1:23:45' : '0:00:00',
      change: isLive ? 'Broadcasting' : 'Offline',
      changeType: isLive ? 'live' : 'offline',
      icon: 'ri-time-line'
    },
    {
      name: 'Chat Messages',
      value: '234',
      change: '+45 new',
      changeType: 'increase',
      icon: 'ri-chat-3-line'
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((item) => (
        <div key={item.name} className="bg-white overflow-hidden shadow-sm rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${
                  isLive ? 'bg-red-100' : 'bg-blue-100'
                }`}>
                  <i className={`${item.icon} text-lg ${
                    isLive ? 'text-red-600' : 'text-blue-600'
                  }`}></i>
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
                        : 'text-gray-500'
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
