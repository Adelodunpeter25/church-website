import { useState, useEffect } from 'react';
import { api } from '@/services/api';
import { Playlist } from '@/types/playlist';

export const usePlaylists = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPlaylists = async (memberId?: string) => {
    setLoading(true);
    try {
      const data = await api.get(`/playlists${memberId ? `?member_id=${memberId}` : ''}`);
      setPlaylists(data);
    } catch (error) {
      console.error('Error fetching playlists:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const getPlaylist = (id: string) =>
    api.get(`/playlists/${id}`);

  const createPlaylist = async (data: any) => {
    const result = await api.post('/playlists', data);
    await fetchPlaylists();
    return result;
  };

  const updatePlaylist = async (id: string, data: any) => {
    const result = await api.put(`/playlists/${id}`, data);
    await fetchPlaylists();
    return result;
  };

  const deletePlaylist = async (id: string) => {
    await api.delete(`/playlists/${id}`);
    await fetchPlaylists();
  };

  const addSermonToPlaylist = (id: string, sermonId: string) =>
    api.post(`/playlists/${id}/sermons`, { sermon_id: sermonId });

  const removeSermonFromPlaylist = (id: string, sermonId: string) =>
    api.delete(`/playlists/${id}/sermons/${sermonId}`);

  const incrementPlays = (id: string) =>
    api.post(`/playlists/${id}/play`, {});

  const toggleSermonBookmark = (sermonId: string, memberId: string, playlistId: string) =>
    api.post(`/playlists/bookmark/${sermonId}`, { member_id: memberId, playlist_id: playlistId });

  return { 
    playlists, 
    loading, 
    fetchPlaylists, 
    getPlaylist, 
    createPlaylist, 
    updatePlaylist, 
    deletePlaylist, 
    addSermonToPlaylist, 
    removeSermonFromPlaylist, 
    incrementPlays, 
    toggleSermonBookmark 
  };
};
