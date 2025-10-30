import { api } from '@/services/api';

export const useUsers = () => {
  const getUsers = (params?: { search?: string; role?: string; status?: string; page?: number; limit?: number }) =>
    api.get(`/users?${new URLSearchParams(params as any).toString()}`);

  const getUserStats = () =>
    api.get('/users/stats');

  const getUser = (id: string) =>
    api.get(`/users/${id}`);

  const createUser = (data: any) =>
    api.post('/users', data);

  const updateUser = (id: string, data: any) =>
    api.put(`/users/${id}`, data);

  const deleteUser = (id: string) =>
    api.delete(`/users/${id}`);

  const resetPassword = (id: string, password: string) =>
    api.post(`/users/${id}/reset-password`, { password });

  return { getUsers, getUserStats, getUser, createUser, updateUser, deleteUser, resetPassword };
};
