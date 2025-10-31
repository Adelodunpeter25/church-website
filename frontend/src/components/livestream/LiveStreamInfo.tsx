import React, { useState, useEffect } from 'react';
import { api } from '@/services/api';

interface LiveStreamInfoProps {
  isLive: boolean;
  viewers?: number;
}

export default function LiveStreamInfo({ isLive, viewers = 0 }: LiveStreamInfoProps) {
  const [serviceTimes, setServiceTimes] = useState<any[]>([]);

  useEffect(() => {
    fetchServiceTimes();
  }, []);

  const fetchServiceTimes = async () => {
    try {
      const data = await api.get('/content/service-times');
      setServiceTimes(data);
    } catch (error) {
      console.error('Error fetching service times:', error);
    }
  };
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Stream Information</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Status</span>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
            isLive ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
          }`}>
            {isLive ? 'Live Now' : 'Offline'}
          </span>
        </div>
        
        {isLive && (
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Viewers</span>
            <span className="font-semibold">{viewers}</span>
          </div>
        )}
        
        {serviceTimes.length > 0 && (
          <div className="pt-4 border-t">
            <h4 className="font-semibold mb-2">Upcoming Services</h4>
            <div className="space-y-2 text-sm">
              {serviceTimes.map((service) => (
                <div key={service.id} className="flex justify-between">
                  <span className="text-gray-600">{service.service}</span>
                  <span>{service.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
