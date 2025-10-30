import { api } from '@/services/api';

export const useRoles = () => {
  const getRoles = () =>
    api.get('/roles');

  const getRole = (id: string) =>
    api.get(`/roles/${id}`);

  const createRole = (data: any) =>
    api.post('/roles', data);

  const updateRole = (id: string, data: any) =>
    api.put(`/roles/${id}`, data);

  const deleteRole = (id: string) =>
    api.delete(`/roles/${id}`);

  const getPermissions = () =>
    api.get('/roles/permissions');

  const getRolePermissions = (role: string) =>
    api.get(`/roles/${role}/permissions`);

  return { getRoles, getRole, createRole, updateRole, deleteRole, getPermissions, getRolePermissions };
};
