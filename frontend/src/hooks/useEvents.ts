import { api } from '@/services/api';

export const useEvents = () => {
  const getEvents = (params?: { search?: string; status?: string; type?: string; page?: number; limit?: number }) =>
    api.get(`/events?${new URLSearchParams(params as any).toString()}`);

  const getMemberEvents = (memberId: string, registeredOnly?: boolean) =>
    api.get(`/events/member/${memberId}${registeredOnly ? '?registered_only=true' : ''}`);

  const getEvent = (id: string) =>
    api.get(`/events/${id}`);

  const createEvent = (data: any) =>
    api.post('/events', data);

  const updateEvent = (id: string, data: any) =>
    api.put(`/events/${id}`, data);

  const deleteEvent = (id: string) =>
    api.delete(`/events/${id}`);

  const registerForEvent = (id: string, memberId: string) =>
    api.post(`/events/${id}/register`, { member_id: memberId });

  const unregisterFromEvent = (id: string, memberId: string) =>
    api.delete(`/events/${id}/register/${memberId}`);

  const getEventAttendees = (id: string) =>
    api.get(`/events/${id}/attendees`);

  const markAttendance = (id: string, memberId: string, attended: boolean) =>
    api.put(`/events/${id}/attendance/${memberId}`, { attended });

  return { getEvents, getMemberEvents, getEvent, createEvent, updateEvent, deleteEvent, registerForEvent, unregisterFromEvent, getEventAttendees, markAttendance };
};
