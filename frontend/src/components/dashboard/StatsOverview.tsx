import { useEffect, useState } from 'react';
import { useDashboard } from '@/hooks/useDashboard';
import { DashboardStats } from '@/types';

export default function StatsOverview() {
  const { getDashboardStats } = useDashboard();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (!stats) return null;

  const statItems = [
    {
      name: 'Total Members',
      value: (stats.totalMembers || 0).toString(),
      change: stats.recentMembers ? `+${stats.recentMembers}` : '',
      changeType: 'increase',
      icon: 'ri-group-line'
    },
    {
      name: 'Total Sermons',
      value: (stats.totalSermons || 0).toString(),
      change: '',
      changeType: 'neutral',
      icon: 'ri-book-line'
    },
    {
      name: 'Upcoming Events',
      value: (stats.upcomingEvents || 0).toString(),
      change: '',
      changeType: 'neutral',
      icon: 'ri-calendar-line'
    },
    {
      name: 'Active Announcements',
      value: (stats.activeAnnouncements || 0).toString(),
      change: '',
      changeType: 'neutral',
      icon: 'ri-megaphone-line'
    }
  ];
  const iconColors = [
    { gradient: 'from-blue-500 to-blue-600' },
    { gradient: 'from-green-500 to-green-600' },
    { gradient: 'from-purple-500 to-purple-600' },
    { gradient: 'from-orange-500 to-orange-600' }
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {statItems.map((item, index) => (
        <div key={item.name} className="relative bg-gradient-to-br from-white to-gray-50 overflow-hidden shadow-sm rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200 group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-gray-100/30 to-transparent rounded-full -mr-12 -mt-12"></div>
          <div className="relative p-4">
            <div className="flex items-start justify-between">
              <div className={`w-12 h-12 flex items-center justify-center bg-gradient-to-br ${iconColors[index].gradient} rounded-xl shadow-md group-hover:scale-110 transition-transform duration-200`}>
                <i className={`${item.icon} text-white text-xl`}></i>
              </div>
              {item.change && (
                <div className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                  item.changeType === 'increase' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                }`}>
                  {item.changeType === 'increase' && (
                    <i className="ri-arrow-up-line text-xs mr-0.5"></i>
                  )}
                  {item.change}
                </div>
              )}
            </div>
            <div className="mt-3">
              <dt className="text-sm font-medium text-gray-600 truncate">
                {item.name}
              </dt>
              <dd className="mt-1">
                <div className="text-3xl font-bold text-gray-900">
                  {item.value}
                </div>
              </dd>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
