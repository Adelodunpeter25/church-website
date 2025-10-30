import { api } from '@/services/api';

export const useContent = () => {
  const getContent = () =>
    api.get('/content');

  const getContentByKey = (key: string) =>
    api.get(`/content/${key}`);

  const updateContent = (key: string, value: string) =>
    api.put(`/content/${key}`, { value });

  const getServiceTimes = () =>
    api.get('/content/service-times');

  const createServiceTime = (data: any) =>
    api.post('/content/service-times', data);

  const updateServiceTime = (id: string, data: any) =>
    api.put(`/content/service-times/${id}`, data);

  const deleteServiceTime = (id: string) =>
    api.delete(`/content/service-times/${id}`);

  return { getContent, getContentByKey, updateContent, getServiceTimes, createServiceTime, updateServiceTime, deleteServiceTime };
};
