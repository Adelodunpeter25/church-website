import { api } from '@/services/api';

export const useNotifications = () => {
  const getRecentNotifications = () => api.get('/settings/notifications/recent');

  return { getRecentNotifications };
};
