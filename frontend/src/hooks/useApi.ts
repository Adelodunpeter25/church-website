import { useState } from 'react';
import { api } from '@/services/api';

interface UseApiOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const request = async (
    apiCall: () => Promise<any>,
    callbacks?: UseApiOptions
  ) => {
    setLoading(true);
    setError(null);

    try {
      const data = await apiCall();
      callbacks?.onSuccess?.(data);
      return data;
    } catch (err: any) {
      const errorMessage = err.message || 'An error occurred';
      setError(errorMessage);
      callbacks?.onError?.(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const get = (endpoint: string, callbacks?: UseApiOptions) =>
    request(() => api.get(endpoint), callbacks);

  const post = (endpoint: string, body: any, callbacks?: UseApiOptions) =>
    request(() => api.post(endpoint, body), callbacks);

  const put = (endpoint: string, body: any, callbacks?: UseApiOptions) =>
    request(() => api.put(endpoint, body), callbacks);

  const del = (endpoint: string, callbacks?: UseApiOptions) =>
    request(() => api.delete(endpoint), callbacks);

  return { loading, error, get, post, put, del };
};
