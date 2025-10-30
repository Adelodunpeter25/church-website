import { api } from '@/services/api';

export const useSeries = () => {
  const getSeries = () =>
    api.get('/series');

  const getSeriesById = (id: string) =>
    api.get(`/series/${id}`);

  const createSeries = (data: any) =>
    api.post('/series', data);

  const updateSeries = (id: string, data: any) =>
    api.put(`/series/${id}`, data);

  const deleteSeries = (id: string) =>
    api.delete(`/series/${id}`);

  return { getSeries, getSeriesById, createSeries, updateSeries, deleteSeries };
};
