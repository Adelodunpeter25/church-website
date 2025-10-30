import { api } from '@/services/api';

export const useAnnouncements = () => {
  const getAnnouncements = (params?: { search?: string; status?: string; priority?: string; page?: number; limit?: number }) =>
    api.get(`/announcements?${new URLSearchParams(params as any).toString()}`);

  const getAnnouncement = (id: string) =>
    api.get(`/announcements/${id}`);

  const createAnnouncement = (data: any) =>
    api.post('/announcements', data);

  const updateAnnouncement = (id: string, data: any) =>
    api.put(`/announcements/${id}`, data);

  const deleteAnnouncement = (id: string) =>
    api.delete(`/announcements/${id}`);

  const incrementViews = (id: string) =>
    api.post(`/announcements/${id}/view`, {});

  return { getAnnouncements, getAnnouncement, createAnnouncement, updateAnnouncement, deleteAnnouncement, incrementViews };
};
