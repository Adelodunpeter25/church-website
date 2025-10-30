import { api } from '@/services/api';

export const useSettings = () => {
  const getSettings = (category?: string) =>
    api.get(`/settings${category ? `?category=${category}` : ''}`);

  const getSettingByKey = (key: string) =>
    api.get(`/settings/${key}`);

  const updateSetting = (key: string, value: string, category?: string) =>
    api.put(`/settings/${key}`, { value, category });

  const updateBulkSettings = (settings: Record<string, string>) =>
    api.post('/settings/bulk', { settings });

  return { getSettings, getSettingByKey, updateSetting, updateBulkSettings };
};
