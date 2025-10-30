import { api } from '@/services/api';

export const useSermons = () => {
  const getSermons = (params?: { search?: string; series?: string; speaker?: string; page?: number; limit?: number }) =>
    api.get(`/sermons?${new URLSearchParams(params as any).toString()}`);

  const getSermon = (id: string) =>
    api.get(`/sermons/${id}`);

  const createSermon = (data: any) =>
    api.post('/sermons', data);

  const updateSermon = (id: string, data: any) =>
    api.put(`/sermons/${id}`, data);

  const deleteSermon = (id: string) =>
    api.delete(`/sermons/${id}`);

  const incrementPlays = (id: string) =>
    api.post(`/sermons/${id}/play`, {});

  const incrementDownloads = (id: string) =>
    api.post(`/sermons/${id}/download`, {});

  return { getSermons, getSermon, createSermon, updateSermon, deleteSermon, incrementPlays, incrementDownloads };
};
