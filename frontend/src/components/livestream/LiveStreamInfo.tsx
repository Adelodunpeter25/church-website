import React from 'react';

interface LiveStreamInfoProps {
  isLive: boolean;
  viewers?: number;
}

export default function LiveStreamInfo({ isLive, viewers = 0 }: LiveStreamInfoProps) {
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
        
        <div className="pt-4 border-t">
          <h4 className="font-semibold mb-2">Upcoming Services</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Sunday Service</span>
              <span>10:00 AM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Wednesday Bible Study</span>
              <span>7:00 PM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
