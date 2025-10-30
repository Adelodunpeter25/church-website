import { api } from '@/services/api';

export const useMembers = () => {
  const getMembers = (params?: { search?: string; role?: string; status?: string; page?: number; limit?: number }) =>
    api.get(`/members?${new URLSearchParams(params as any).toString()}`);

  const getMember = (id: string) =>
    api.get(`/members/${id}`);

  const createMember = (data: any) =>
    api.post('/members', data);

  const updateMember = (id: string, data: any) =>
    api.put(`/members/${id}`, data);

  const deleteMember = (id: string) =>
    api.delete(`/members/${id}`);

  return { getMembers, getMember, createMember, updateMember, deleteMember };
};
