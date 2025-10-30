import { api } from '@/services/api';

export const useGiving = () => {
  const getMemberGiving = (memberId: string, year?: number) =>
    api.get(`/giving/member/${memberId}${year ? `?year=${year}` : ''}`);

  const getMemberGivingSummary = (memberId: string, year?: number) =>
    api.get(`/giving/member/${memberId}/summary${year ? `?year=${year}` : ''}`);

  const createGiving = (data: any) =>
    api.post('/giving', data);

  return { getMemberGiving, getMemberGivingSummary, createGiving };
};
