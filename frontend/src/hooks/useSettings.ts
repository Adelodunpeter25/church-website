import { api } from '@/services/api';

export const useSettings = () => {
  const getSettings = (category?: string) =>
    api.get(`/settings${category ? `?category=${category}` : ''}`);

  const getSettingByKey = (key: string) =>
    api.get(`/settings/${key}`);

  const updateSetting = (key: string, value: string, category?: string) =>
    api.put(`/settings/${key}`, { value, category });

  const updateBulkSettings = (settings: Record<string, any>, category?: string) => {
    const settingsWithCategory = Object.entries(settings).reduce((acc, [key, value]) => {
      acc[key] = { value, category };
      return acc;
    }, {} as Record<string, any>);
    return api.post('/settings/bulk', { settings: settingsWithCategory });
  };

  const getSystemStatus = () =>
    api.get('/settings/system/status');

  const getSecurityLogs = (limit?: number) =>
    api.get(`/settings/security/logs${limit ? `?limit=${limit}` : ''}`);

  const getSecurityStats = () =>
    api.get('/settings/security/stats');

  const getRecentNotifications = () =>
    api.get('/settings/notifications/recent');

  const getIntegrationStats = () =>
    api.get('/settings/integrations/stats');

  const getBackupHistory = () =>
    api.get('/settings/system/backups');

  return { getSettings, getSettingByKey, updateSetting, updateBulkSettings, getSystemStatus, getSecurityLogs, getSecurityStats, getRecentNotifications, getIntegrationStats, getBackupHistory };
};
