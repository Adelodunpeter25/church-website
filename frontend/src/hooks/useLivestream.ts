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

  const endLivestream = (id: string) =>
    api.post(`/livestreams/${id}/end`, {});

  const updateViewerCount = (id: string, viewers: number) =>
    api.put(`/livestreams/${id}/viewers`, { viewers });

  const getChatMessages = (id: string, limit?: number) =>
    api.get(`/livestreams/${id}/chat${limit ? `?limit=${limit}` : ''}`);

  const sendChatMessage = (id: string, data: any) =>
    api.post(`/livestreams/${id}/chat`, data);

  return { getLivestreams, getCurrentLivestream, getStreamHistory, createLivestream, updateLivestream, endLivestream, updateViewerCount, getChatMessages, sendChatMessage };
};
