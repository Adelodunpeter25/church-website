import { api } from '@/services/api';

export const useProfile = () => {
  const getProfile = (userId: string) =>
    api.get(`/profile/${userId}`);

  const updateProfile = (userId: string, data: any) =>
    api.put(`/profile/${userId}`, data);

  const changePassword = (userId: string, currentPassword: string, newPassword: string) =>
    api.post(`/profile/${userId}/change-password`, { current_password: currentPassword, new_password: newPassword });

  const uploadPhoto = (userId: string, photoUrl: string) =>
    api.post(`/profile/${userId}/photo`, { photo_url: photoUrl });

  const getNotificationPreferences = (userId: string) =>
    api.get(`/profile/${userId}/notifications`);

  const updateNotificationPreferences = (userId: string, preferences: any) =>
    api.put(`/profile/${userId}/notifications`, { preferences });

  return { getProfile, updateProfile, changePassword, uploadPhoto, getNotificationPreferences, updateNotificationPreferences };
};
