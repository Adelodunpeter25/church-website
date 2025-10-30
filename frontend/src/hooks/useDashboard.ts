import { api } from '@/services/api';

export const useDashboard = () => {
  const getDashboardStats = () =>
    api.get('/dashboard/stats');

  const getRecentActivity = () =>
    api.get('/dashboard/activity');

  const getMemberStats = (memberId: string) =>
    api.get(`/dashboard/member/${memberId}/stats`);

  const getMemberRecentSermons = (memberId: string) =>
    api.get(`/dashboard/member/${memberId}/recent-sermons`);

  const getMemberUpcomingEvents = (memberId: string) =>
    api.get(`/dashboard/member/${memberId}/upcoming-events`);

  return { getDashboardStats, getRecentActivity, getMemberStats, getMemberRecentSermons, getMemberUpcomingEvents };
};
