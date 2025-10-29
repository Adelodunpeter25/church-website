
'use client';

import { useState } from 'react';

interface PlaylistGridProps {
  viewMode: 'grid' | 'list';
}

const playlists = [
  {
    id: 1,
    name: 'Sunday Morning Favorites',
    description: 'Collection of my favorite Sunday morning sermons that inspire and uplift',
    sermonCount: 12,
    totalDuration: '8h 45m',
    createdDate: '2024-01-01',
    lastUpdated: '2024-01-14',
    isPublic: false,
    plays: 45,
    sermons: [
      'Walking in Faith - Part 3',
      'The Power of Prayer',
      'Love in Action',
      'Finding Hope in Dark Times'
    ]
  },
  {
    id: 2,
    name: 'Faith Building Series',
    description: 'Sermons focused on strengthening faith and trust in God during challenging times',
    sermonCount: 8,
    totalDuration: '6h 20m',
    createdDate: '2023-12-15',
    lastUpdated: '2024-01-10',
    isPublic: true,
    plays: 23,
    sermons: [
      'Walking in Faith - Part 1',
      'Walking in Faith - Part 2',
      'Trust in the Lord',
      'Overcoming Fear'
    ]
  },
  {
    id: 3,
    name: 'Prayer & Worship',
    description: 'Messages about the importance of prayer and worship in our daily Christian walk',
    sermonCount: 6,
    totalDuration: '4h 15m',
    createdDate: '2023-11-20',
    lastUpdated: '2024-01-05',
    isPublic: false,
    plays: 18,
    sermons: [
      'The Power of Prayer',
      'Worship in Spirit and Truth',
      'Prayer Warriors',
      'Intimate Prayer Life'
    ]
  },
  {
    id: 4,
    name: 'Youth Ministry Messages',
    description: 'Engaging sermons specifically designed for young people and their unique challenges',
    sermonCount: 15,
    totalDuration: '10h 30m',
    createdDate: '2023-10-01',
    lastUpdated: '2024-01-12',
    isPublic: true,
    plays: 67,
    sermons: [
      'Living for Christ as a Teen',
      'Peer Pressure and Faith',
      'God\'s Plan for Your Life',
      'Social Media and Faith'
    ]
  }
];

export default function PlaylistGrid({ viewMode }: PlaylistGridProps) {
  const [playingPlaylist, setPlayingPlaylist] = useState<number | null>(null);

  const togglePlay = (playlistId: number) => {
    if (playingPlaylist === playlistId) {
      setPlayingPlaylist(null);
    } else {
      setPlayingPlaylist(playlistId);
    }
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="divide-y divide-gray-200">
          {playlists.map((playlist) => (
            <div key={playlist.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <i className="ri-playlist-line text-white text-2xl"></i>
                    </div>
                    <button
                      onClick={() => togglePlay(playlist.id)}
                      className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                    >
                      <i className={`${playingPlaylist === playlist.id ? 'ri-pause-fill' : 'ri-play-fill'} text-white text-lg`}></i>
                    </button>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">{playlist.name}</h3>
                      {playlist.isPublic && (
                        <span className="inline-flex px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                          Public
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{playlist.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{playlist.sermonCount} sermons</span>
                      <span>{playlist.totalDuration}</span>
                      <span>{playlist.plays} plays</span>
                      <span>Updated {new Date(playlist.lastUpdated).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => togglePlay(playlist.id)}
                    className={`flex items-center px-3 py-1 rounded-md text-sm cursor-pointer whitespace-nowrap ${
                      playingPlaylist === playlist.id 
                        ? 'bg-red-100 text-red-700' 
                        : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                    }`}
                  >
                    <i className={`${playingPlaylist === playlist.id ? 'ri-pause-line' : 'ri-play-line'} mr-1`}></i>
                    {playingPlaylist === playlist.id ? 'Playing' : 'Play'}
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 cursor-pointer">
                    <div className="w-4 h-4 flex items-center justify-center">
                      <i className="ri-more-2-line"></i>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {playlists.map((playlist) => (
        <div key={playlist.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
          <div className="relative">
            <div className="h-48 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500"></div>
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <button
                onClick={() => togglePlay(playlist.id)}
                className="w-16 h-16 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors cursor-pointer"
              >
                <i className={`${playingPlaylist === playlist.id ? 'ri-pause-fill' : 'ri-play-fill'} text-white text-3xl`}></i>
              </button>
            </div>
            <div className="absolute top-4 right-4">
              {playlist.isPublic && (
                <span className="inline-flex px-2 py-1 text-xs bg-white bg-opacity-20 text-white rounded-full backdrop-blur-sm">
                  Public
                </span>
              )}
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center text-white text-sm">
                <i className="ri-music-line mr-1"></i>
                {playlist.sermonCount} sermons • {playlist.totalDuration}
              </div>
            </div>
          </div>
          
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{playlist.name}</h3>
            <p className="text-sm text-gray-600 mb-3">{playlist.description}</p>
            
            <div className="space-y-1 mb-4">
              {playlist.sermons.slice(0, 3).map((sermon, index) => (
                <div key={index} className="text-xs text-gray-500 truncate">
                  {index + 1}. {sermon}
                </div>
              ))}
              {playlist.sermons.length > 3 && (
                <div className="text-xs text-gray-400">
                  +{playlist.sermons.length - 3} more sermons
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
              <span>Created {new Date(playlist.createdDate).toLocaleDateString()}</span>
              <span>{playlist.plays} plays</span>
            </div>
            
            <div className="flex items-center justify-between">
              <button
                onClick={() => togglePlay(playlist.id)}
                className={`flex items-center px-3 py-1 rounded-md text-sm cursor-pointer whitespace-nowrap ${
                  playingPlaylist === playlist.id 
                    ? 'bg-red-100 text-red-700' 
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }`}
              >
                <i className={`${playingPlaylist === playlist.id ? 'ri-pause-line' : 'ri-play-line'} mr-1`}></i>
                {playingPlaylist === playlist.id ? 'Playing' : 'Play All'}
              </button>
              
              <div className="flex items-center space-x-1">
                <button className="p-2 text-gray-400 hover:text-blue-600 cursor-pointer">
                  <div className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-edit-line"></i>
                  </div>
                </button>
                <button className="p-2 text-gray-400 hover:text-green-600 cursor-pointer">
                  <div className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-share-line"></i>
                  </div>
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 cursor-pointer">
                  <div className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-more-2-line"></i>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {playlists.length === 0 && (
        <div className="col-span-full text-center py-12">
          <i className="ri-playlist-line text-gray-400 text-4xl mb-4"></i>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No playlists yet</h3>
          <p className="text-gray-500 mb-4">Create your first playlist to organize your favorite sermons.</p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 cursor-pointer whitespace-nowrap">
            Create Playlist
          </button>
        </div>
      )}
    </div>
  );
}
