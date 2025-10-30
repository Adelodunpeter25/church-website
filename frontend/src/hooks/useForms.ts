import { api } from '@/services/api';

export const useForms = () => {
  const getForms = (params?: { search?: string; status?: string; type?: string; page?: number; limit?: number }) =>
    api.get(`/forms?${new URLSearchParams(params as any).toString()}`);

  const getForm = (id: string) =>
    api.get(`/forms/${id}`);

  const createForm = (data: any) =>
    api.post('/forms', data);

  const updateForm = (id: string, data: any) =>
    api.put(`/forms/${id}`, data);

  const deleteForm = (id: string) =>
    api.delete(`/forms/${id}`);

  const deleteForms = (ids: string[]) =>
    api.post('/forms/delete-multiple', { ids });

  const submitFormResponse = (id: string, data: any) =>
    api.post(`/forms/${id}/responses`, data);

  const getFormResponses = (id: string) =>
    api.get(`/forms/${id}/responses`);

  const exportFormResponses = (id: string) =>
    api.get(`/forms/${id}/responses/export`);

  return { getForms, getForm, createForm, updateForm, deleteForm, deleteForms, submitFormResponse, getFormResponses, exportFormResponses };
};
