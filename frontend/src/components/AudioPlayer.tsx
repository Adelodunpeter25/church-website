import { useState, useEffect, useRef } from 'react';
import { Sermon } from '@/types';
import { getMediaUrl } from '@/services/api';

interface AudioPlayerProps {
  sermon: Sermon | null;
  onClose: () => void;
}

export default function AudioPlayer({ sermon, onClose }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [hasEnded, setHasEnded] = useState(false);

  useEffect(() => {
    if (sermon && audioRef.current) {
      const audio = audioRef.current;
      audio.src = getMediaUrl(sermon.audio_url) || '';
      audio.load();
      audio.play();
      setIsPlaying(true);
    }
  }, [sermon]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      setHasEnded(true);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (hasEnded) {
        audioRef.current.currentTime = 0;
        setHasEnded(false);
      }
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' && sermon) {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isPlaying, hasEnded, sermon]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.volume = vol;
      setVolume(vol);
    }
  };

  const skip = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime += seconds;
    }
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!sermon) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <audio ref={audioRef} />
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-4 flex-1">
            <img 
              src={getMediaUrl(sermon.thumbnail_url) || `https://readdy.ai/api/search-image?query=sermon&width=100&height=100&seq=${sermon.id}`}
              alt={sermon.title}
              className="w-12 h-12 rounded object-cover"
            />
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-gray-900 truncate">{sermon.title}</h4>
              <p className="text-xs text-gray-500 truncate">{sermon.speaker}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600">
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <button onClick={() => skip(-10)} className="p-2 text-gray-600 hover:text-gray-900">
            <i className="ri-replay-10-line text-xl"></i>
          </button>
          <button onClick={togglePlay} className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700">
            <i className={`${hasEnded ? 'ri-restart-line' : isPlaying ? 'ri-pause-fill' : 'ri-play-fill'} text-xl`}></i>
          </button>
          <button onClick={() => skip(10)} className="p-2 text-gray-600 hover:text-gray-900">
            <i className="ri-forward-10-line text-xl"></i>
          </button>

          <div className="flex-1 flex items-center space-x-3">
            <span className="text-xs text-gray-500 w-10">{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${(currentTime / duration) * 100}%, #E5E7EB ${(currentTime / duration) * 100}%, #E5E7EB 100%)`
              }}
            />
            <span className="text-xs text-gray-500 w-10">{formatTime(duration)}</span>
          </div>

          <div className="flex items-center space-x-2">
            <i className="ri-volume-up-line text-gray-600"></i>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
