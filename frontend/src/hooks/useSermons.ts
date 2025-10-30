import { useState, useEffect } from 'react';
import { api } from '@/services/api';
import { Sermon } from '@/types/sermon';

export const useSermons = () => {
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchSermons = async (params?: { search?: string; series?: string; speaker?: string; page?: number; limit?: number }) => {
    setLoading(true);
    try {
      const data = await api.get(`/sermons?${new URLSearchParams(params as any).toString()}`);
      setSermons(data);
    } catch (error) {
      console.error('Error fetching sermons:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSermons();
  }, []);

  const getSermon = (id: string) =>
    api.get(`/sermons/${id}`);

  const createSermon = async (data: any) => {
    const result = await api.post('/sermons', data);
    await fetchSermons();
    return result;
  };

  const updateSermon = async (id: string, data: any) => {
    const result = await api.put(`/sermons/${id}`, data);
    await fetchSermons();
    return result;
  };

  const deleteSermon = async (id: string) => {
    await api.delete(`/sermons/${id}`);
    await fetchSermons();
  };

  const incrementPlays = (id: string) =>
    api.post(`/sermons/${id}/play`, {});

  const incrementDownloads = (id: string) =>
    api.post(`/sermons/${id}/download`, {});

  return { sermons, loading, fetchSermons, getSermon, createSermon, updateSermon, deleteSermon, incrementPlays, incrementDownloads };
};
