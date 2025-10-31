import React, { useState } from 'react';

interface LiveStreamPlayerProps {
  isLive: boolean;
  title?: string;
  streamUrl?: string;
}

export default function LiveStreamPlayer({ isLive, title, streamUrl }: LiveStreamPlayerProps) {
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 flex items-center justify-center relative">
        {isLive ? (
          <>
            <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              LIVE
            </div>
            <div className="text-white text-center">
              <i className="ri-radio-line text-6xl mb-4"></i>
              <p className="text-xl font-semibold">Audio Stream Active</p>
              <p className="text-sm mt-2 text-blue-100">{title || 'Sunday Morning Service'}</p>
            </div>
          </>
        ) : (
          <div className="text-blue-100 text-center">
            <i className="ri-radio-line text-6xl mb-4"></i>
            <p className="text-xl">No Live Stream</p>
            <p className="text-sm mt-2">Check back during service times</p>
          </div>
        )}
      </div>
      
      {isLive && (
        <div className="p-4 flex items-center gap-4 border-t">
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="text-blue-600 hover:text-blue-800"
          >
            <i className={`${isPlaying ? 'ri-pause-fill' : 'ri-play-fill'} text-2xl`}></i>
          </button>
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className="text-gray-600 hover:text-gray-800"
          >
            <i className={`${isMuted ? 'ri-volume-mute-fill' : 'ri-volume-up-fill'} text-2xl`}></i>
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={isMuted ? 0 : volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="flex-1"
          />
          <span className="text-sm text-gray-600">{isMuted ? 0 : volume}%</span>
        </div>
      )}
    </div>
  );
}
