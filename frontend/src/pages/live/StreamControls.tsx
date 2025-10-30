


import { useState } from 'react';

interface StreamControlsProps {
  isLive: boolean;
  onToggleLive: (live: boolean) => void;
  loading?: boolean;
}

export default function StreamControls({ isLive, onToggleLive, loading }: StreamControlsProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(75);
  const [inputGain, setInputGain] = useState(65);

  const handleGoLive = () => {
    onToggleLive(!isLive);
  };

  return (
    <div className="p-6 border-t border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleGoLive}
            disabled={loading}
            className={`flex items-center px-6 py-3 rounded-lg font-medium cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed ${
              isLive 
                ? 'bg-red-600 text-white hover:bg-red-700' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            <i className={`${isLive ? 'ri-stop-circle-line' : 'ri-mic-line'} mr-2 text-lg`}></i>
            {loading ? 'Processing...' : isLive ? 'Stop Stream' : 'Go Live'}
          </button>
          
          {isLive && (
            <>
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-3 rounded-lg cursor-pointer ${
                  isMuted 
                    ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className={isMuted ? 'ri-mic-off-line' : 'ri-mic-line'}></i>
                </div>
              </button>
              
              <div className="flex items-center space-x-3 bg-gray-50 px-4 py-2 rounded-lg">
                <span className="text-sm text-gray-600 whitespace-nowrap">Input Gain</span>
                <i className="ri-volume-down-line text-gray-400"></i>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={inputGain}
                  onChange={(e) => setInputGain(parseInt(e.target.value))}
                  className="w-20"
                />
                <i className="ri-volume-up-line text-gray-400"></i>
                <span className="text-sm text-gray-500 w-8">{inputGain}%</span>
              </div>

              <div className="flex items-center space-x-3 bg-gray-50 px-4 py-2 rounded-lg">
                <span className="text-sm text-gray-600 whitespace-nowrap">Output</span>
                <i className="ri-headphone-line text-gray-400"></i>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(parseInt(e.target.value))}
                  className="w-20"
                />
                <span className="text-sm text-gray-500 w-8">{volume}%</span>
              </div>
            </>
          )}
        </div>
        
        <div className="flex items-center space-x-3">
          {isLive && (
            <div className="flex items-center space-x-2 text-sm text-gray-600 bg-green-50 px-3 py-2 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Broadcasting</span>
            </div>
          )}
          <button className="p-2 text-gray-400 hover:text-gray-600 cursor-pointer">
            <div className="w-5 h-5 flex items-center justify-center">
              <i className="ri-settings-3-line"></i>
            </div>
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 cursor-pointer">
            <div className="w-5 h-5 flex items-center justify-center">
              <i className="ri-share-line"></i>
            </div>
          </button>
        </div>
      </div>
      
      {isLive && (
        <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center">
            <i className="ri-information-line text-green-600 mr-2"></i>
            <span className="text-sm text-green-800">
              Your audio stream is live and broadcasting to the congregation. Stream URL has been shared automatically.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
