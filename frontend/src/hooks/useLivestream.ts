import { api } from '@/services/api';

export const useLivestream = () => {
  const getLivestreams = () =>
    api.get('/livestreams');

  const getCurrentLivestream = () =>
    api.get('/livestreams/current');

  const getStreamHistory = (page = 1, limit = 5) =>
    api.get(`/livestreams/history?page=${page}&limit=${limit}`);

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

  const deleteChatMessage = (id: string, messageId: string) =>
    api.delete(`/livestreams/${id}/chat/${messageId}`);

  const getViewers = (id: string) =>
    api.get(`/livestreams/${id}/viewers`);

  const addViewer = (id: string, data: any) =>
    api.post(`/livestreams/${id}/viewers`, data);

  const removeViewer = (id: string, viewerId: number) =>
    api.delete(`/livestreams/${id}/viewers/${viewerId}`);

  const banViewer = (id: string, viewerId: number) =>
    api.post(`/livestreams/${id}/viewers/${viewerId}/ban`, {});

  const unbanViewer = (id: string, viewerId: number) =>
    api.post(`/livestreams/${id}/viewers/${viewerId}/unban`, {});

  const getStreamStats = (id: string) =>
    api.get(`/livestreams/${id}/stats`);

  return { 
    getLivestreams, 
    getCurrentLivestream, 
    getStreamHistory, 
    createLivestream, 
    updateLivestream, 
    endLivestream, 
    updateViewerCount, 
    getChatMessages, 
    sendChatMessage, 
    deleteChatMessage, 
    getViewers, 
    addViewer, 
    removeViewer, 
    banViewer, 
    unbanViewer, 
    getStreamStats 
  };
};
