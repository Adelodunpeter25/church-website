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
      change: `+${stats.recentMembers || 0}`,
      changeType: 'increase',
      icon: 'ri-group-line'
    },
    {
      name: 'Total Sermons',
      value: (stats.totalSermons || 0).toString(),
      change: 'Available',
      changeType: 'neutral',
      icon: 'ri-book-line'
    },
    {
      name: 'Upcoming Events',
      value: (stats.upcomingEvents || 0).toString(),
      change: 'Scheduled',
      changeType: 'neutral',
      icon: 'ri-calendar-line'
    },
    {
      name: 'Active Announcements',
      value: (stats.activeAnnouncements || 0).toString(),
      change: 'Published',
      changeType: 'neutral',
      icon: 'ri-megaphone-line'
    }
  ];
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {statItems.map((item) => (
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
                      item.changeType === 'increase' ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      {item.changeType === 'increase' && (
                        <i className="ri-arrow-up-line text-xs mr-1"></i>
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
