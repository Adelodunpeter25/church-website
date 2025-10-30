import { api } from '@/services/api';

export const usePlaylists = () => {
  const getPlaylists = (memberId?: string) =>
    api.get(`/playlists${memberId ? `?member_id=${memberId}` : ''}`);

  const getPlaylist = (id: string) =>
    api.get(`/playlists/${id}`);

  const createPlaylist = (data: any) =>
    api.post('/playlists', data);

  const updatePlaylist = (id: string, data: any) =>
    api.put(`/playlists/${id}`, data);

  const deletePlaylist = (id: string) =>
    api.delete(`/playlists/${id}`);

  const addSermonToPlaylist = (id: string, sermonId: string) =>
    api.post(`/playlists/${id}/sermons`, { sermon_id: sermonId });

  const removeSermonFromPlaylist = (id: string, sermonId: string) =>
    api.delete(`/playlists/${id}/sermons/${sermonId}`);

  const incrementPlays = (id: string) =>
    api.post(`/playlists/${id}/play`, {});

  const toggleSermonBookmark = (sermonId: string, memberId: string, playlistId: string) =>
    api.post(`/playlists/bookmark/${sermonId}`, { member_id: memberId, playlist_id: playlistId });

  return { getPlaylists, getPlaylist, createPlaylist, updatePlaylist, deletePlaylist, addSermonToPlaylist, removeSermonFromPlaylist, incrementPlays, toggleSermonBookmark };
};
