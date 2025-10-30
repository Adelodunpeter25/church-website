import { api } from '@/services/api';

export const useLivestream = () => {
  const getLivestreams = () =>
    api.get('/livestreams');

  const getCurrentLivestream = () =>
    api.get('/livestreams/current');

  const getStreamHistory = () =>
    api.get('/livestreams/history');

  const createLivestream = (data: any) =>
    api.post('/livestreams', data);

  const updateLivestream = (id: string, data: any) =>
    api.put(`/livestreams/${id}`, data);

  const endLivestream = (id: number) =>
    api.post(`/livestreams/${id}/end`, {});

  const updateViewerCount = (id: number, viewers: number) =>
    api.put(`/livestreams/${id}/viewers`, { viewers });

  const getChatMessages = (id: number, limit?: number) =>
    api.get(`/livestreams/${id}/chat${limit ? `?limit=${limit}` : ''}`);

  const sendChatMessage = (id: number, data: any) =>
    api.post(`/livestreams/${id}/chat`, data);

  const getViewers = (id: number) =>
    api.get(`/livestreams/${id}/viewers`);

  const addViewer = (id: number, data: any) =>
    api.post(`/livestreams/${id}/viewers`, data);

  const removeViewer = (id: number, viewerId: number) =>
    api.delete(`/livestreams/${id}/viewers/${viewerId}`);

  const banViewer = (id: number, viewerId: number) =>
    api.post(`/livestreams/${id}/viewers/${viewerId}/ban`, {});

  const unbanViewer = (id: number, viewerId: number) =>
    api.post(`/livestreams/${id}/viewers/${viewerId}/unban`, {});

  const getStreamStats = (id: number) =>
    api.get(`/livestreams/${id}/stats`);

  return { getLivestreams, getCurrentLivestream, getStreamHistory, createLivestream, updateLivestream, endLivestream, updateViewerCount, getChatMessages, sendChatMessage, getViewers, addViewer, removeViewer, banViewer, unbanViewer, getStreamStats };
};
