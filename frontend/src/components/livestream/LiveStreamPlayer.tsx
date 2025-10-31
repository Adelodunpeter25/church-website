import React, { useState, useEffect } from 'react';
import { useLivestream } from '@/hooks/useLivestream';
import { useAuth } from '@/context/AuthContext';

interface LiveStreamPlayerProps {
  isLive: boolean;
  title?: string;
  description?: string;
  streamUrl?: string;
  streamId?: string;
}

export default function LiveStreamPlayer({ isLive, title, description, streamUrl, streamId }: LiveStreamPlayerProps) {
  const { addViewer } = useLivestream();
  const { user } = useAuth();
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);

  useEffect(() => {
    return () => {
      if (hasJoined && streamId) {
        // Cleanup when component unmounts
      }
    };
  }, [hasJoined, streamId]);

  const handlePlay = async () => {
    const newPlayingState = !isPlaying;
    setIsPlaying(newPlayingState);
    
    if (newPlayingState && !hasJoined && streamId && user) {
      try {
        const result = await addViewer(streamId, { name: user.name, location: 'Online', user_id: user.id });
        setHasJoined(true);
        if (result?.id) {
          (window as any).currentViewerId = result.id;
        }
      } catch (error) {
        console.error('Error adding viewer:', error);
      }
    } else if (!newPlayingState && hasJoined && streamId) {
      try {
        const viewerId = (window as any).currentViewerId;
        if (viewerId) {
          await fetch(`${import.meta.env.VITE_API_URL}/livestreams/${streamId}/viewers/${viewerId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
          });
          setHasJoined(false);
          delete (window as any).currentViewerId;
        }
      } catch (error) {
        console.error('Error removing viewer:', error);
      }
    }
  };

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
              <p className="text-2xl font-bold mb-2">{title || 'Live Audio Stream'}</p>
              {description && <p className="text-base text-blue-100 max-w-2xl mx-auto">{description}</p>}
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
            onClick={handlePlay}
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
