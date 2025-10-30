import { useState, useEffect } from 'react';
import { useSermons } from '@/hooks/useSermons';
import { Sermon } from '@/types';
import ConfirmDialog from '@/components/modals/ConfirmDialog';
import { getMediaUrl } from '@/services/api';
import AudioPlayer from '@/components/AudioPlayer';
import EditSermonModal from './EditSermonModal';

interface SermonGridProps {
  searchTerm: string;
  filterSeries: string;
  filterSpeaker: string;
  filterDateRange: string;
  sortBy: string;
  viewMode: 'grid' | 'list';
}

export default function SermonGrid({ 
  searchTerm, 
  filterSeries, 
  filterSpeaker, 
  filterDateRange, 
  sortBy, 
  viewMode 
}: SermonGridProps) {
  const { sermons, fetchSermons, deleteSermon } = useSermons();
  const [loading, setLoading] = useState(true);
  const [playingSermon, setPlayingSermon] = useState<Sermon | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [sermonToDelete, setSermonToDelete] = useState<{ id: string; title: string } | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [sermonToEdit, setSermonToEdit] = useState<Sermon | null>(null);

  useEffect(() => {
    loadSermons();
  }, [searchTerm, filterSeries, filterSpeaker, sortBy]);

  const loadSermons = async () => {
    try {
      setLoading(true);
      const params: any = {};
      if (searchTerm) params.search = searchTerm;
      if (filterSeries !== 'all') params.series = filterSeries;
      if (filterSpeaker !== 'all') params.speaker = filterSpeaker;
      if (sortBy) params.sort = sortBy;
      await fetchSermons(params);
    } catch (error) {
      console.error('Error fetching sermons:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!sermonToDelete) return;
    try {
      await deleteSermon(sermonToDelete.id);
      setShowDeleteConfirm(false);
      setSermonToDelete(null);
      loadSermons();
    } catch (error) {
      console.error('Error deleting sermon:', error);
    }
  };

  const togglePlay = (sermon: Sermon) => {
    if (playingSermon?.id === sermon.id) {
      setPlayingSermon(null);
    } else {
      setPlayingSermon(sermon);
    }
  };

  const downloadSermon = async (sermon: Sermon) => {
    try {
      const audioUrl = getMediaUrl(sermon.audio_url);
      if (!audioUrl) {
        alert('Audio file not available');
        return;
      }
      
      const response = await fetch(audioUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${sermon.title}.mp3`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/sermons/${sermon.id}/download`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      console.error('Error downloading sermon:', error);
      alert('Failed to download sermon');
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading sermons...</div>;
  }

  const filteredSermons = sermons;

  if (viewMode === 'list') {
    return (
      <div className="overflow-hidden">
        <div className="px-6 py-3 bg-gray-50 border-b border-gray-100 text-sm text-gray-600">
          Showing {filteredSermons.length} sermons
        </div>
        <div className="divide-y divide-gray-200">
          {filteredSermons.map((sermon) => (
            <div key={sermon.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <div className="relative">
                    <img 
                      className="w-16 h-16 rounded-lg object-top object-cover" 
                      src={getMediaUrl(sermon.thumbnail_url) || `https://readdy.ai/api/search-image?query=modern%20church%20sermon%20artwork&width=200&height=200&seq=${sermon.id}&orientation=squarish`}
                      alt={sermon.title}
                    />
                    <button
                      onClick={() => togglePlay(sermon)}
                      className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                    >
                      <i className={`${playingSermon?.id === sermon.id ? 'ri-pause-fill' : 'ri-play-fill'} text-white text-lg`}></i>
                    </button>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium text-gray-900 truncate">{sermon.title}</h3>
                    <p className="text-sm text-gray-500">{sermon.speaker}</p>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                      <span>{new Date(sermon.date.split('T')[0] + 'T00:00:00Z').toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric', timeZone: 'UTC' })}</span>
                      <span>{sermon.duration}</span>
                      {sermon.series_name && (
                        <span className="inline-flex px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                          {sermon.series_name}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-2 truncate">{sermon.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-gray-500 text-right">
                    <div className="flex items-center">
                      <i className="ri-play-line mr-1"></i>
                      {sermon.plays}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => downloadSermon(sermon)}
                      className="p-2 text-gray-400 hover:text-blue-600 cursor-pointer"
                    >
                      <div className="w-5 h-5 flex items-center justify-center">
                        <i className="ri-download-line"></i>
                      </div>
                    </button>
                    <button
                      onClick={() => {
                        setSermonToEdit(sermon);
                        setShowEditModal(true);
                      }}
                      className="p-2 text-gray-400 hover:text-green-600 cursor-pointer"
                      title="Edit"
                    >
                      <div className="w-5 h-5 flex items-center justify-center">
                        <i className="ri-edit-line"></i>
                      </div>
                    </button>
                    <button 
                      onClick={() => {
                        setSermonToDelete({ id: sermon.id, title: sermon.title });
                        setShowDeleteConfirm(true);
                      }}
                      className="p-2 text-gray-400 hover:text-red-600 cursor-pointer"
                      title="Delete"
                    >
                      <div className="w-5 h-5 flex items-center justify-center">
                        <i className="ri-delete-bin-line"></i>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <ConfirmDialog
          isOpen={showDeleteConfirm}
          onClose={() => setShowDeleteConfirm(false)}
          onConfirm={handleDelete}
          title="Delete Sermon"
          message={`Are you sure you want to delete "${sermonToDelete?.title}"? This action cannot be undone.`}
          confirmText="Delete"
          type="danger"
        />
        {filteredSermons.length === 0 && (
          <div className="text-center py-12">
            <i className="ri-file-search-line text-gray-400 text-4xl mb-4"></i>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No sermons found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <AudioPlayer sermon={playingSermon} onClose={() => setPlayingSermon(null)} />
      {sermonToEdit && (
        <EditSermonModal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setSermonToEdit(null);
          }}
          onSuccess={loadSermons}
          sermon={sermonToEdit}
        />
      )}
    <div className="p-6">
      <div className="mb-4 text-sm text-gray-600">
        Showing {filteredSermons.length} sermons
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSermons.map((sermon) => (
          <div key={sermon.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative">
              <img 
                className="w-full h-48 object-top object-cover" 
                src={getMediaUrl(sermon.thumbnail_url) || `https://readdy.ai/api/search-image?query=modern%20church%20sermon%20artwork&width=400&height=300&seq=${sermon.id}&orientation=landscape`}
                alt={sermon.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <button
                onClick={() => togglePlay(sermon)}
                className="absolute inset-0 flex items-center justify-center cursor-pointer"
              >
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                  <i className={`${playingSermon?.id === sermon.id ? 'ri-pause-fill' : 'ri-play-fill'} text-white text-2xl`}></i>
                </div>
              </button>
              <div className="absolute bottom-4 left-4 right-4">
                {sermon.series_name ? (
                  <span className="inline-flex px-2 py-1 text-xs bg-blue-600 text-white rounded-full">
                    {sermon.series_name}
                  </span>
                ) : (
                  <span className="inline-flex px-2 py-1 text-xs bg-gray-600 text-white rounded-full">
                    Standalone
                  </span>
                )}
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{sermon.title}</h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{sermon.description}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span className="truncate">{sermon.speaker}</span>
                <span>{sermon.duration}</span>
              </div>
              
              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <span>{new Date(sermon.date.split('T')[0] + 'T00:00:00Z').toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric', timeZone: 'UTC' })}</span>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center">
                    <i className="ri-play-line mr-1"></i>
                    {sermon.plays}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <button
                  onClick={() => togglePlay(sermon)}
                  className={`flex items-center px-3 py-1 rounded-md text-sm cursor-pointer whitespace-nowrap ${
                    playingSermon?.id === sermon.id 
                      ? 'bg-red-100 text-red-700' 
                      : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                  }`}
                >
                  <i className={`${playingSermon?.id === sermon.id ? 'ri-pause-line' : 'ri-play-line'} mr-1`}></i>
                  {playingSermon?.id === sermon.id ? 'Playing' : 'Play'}
                </button>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => downloadSermon(sermon)}
                    className="p-2 text-gray-400 hover:text-blue-600 cursor-pointer"
                    title="Download"
                  >
                    <i className="ri-download-line"></i>
                  </button>
                  <button
                    onClick={() => {
                      setSermonToEdit(sermon);
                      setShowEditModal(true);
                    }}
                    className="p-2 text-gray-400 hover:text-green-600 cursor-pointer"
                    title="Edit"
                  >
                    <i className="ri-edit-line"></i>
                  </button>
                  <button
                    onClick={() => {
                      setSermonToDelete({ id: sermon.id, title: sermon.title });
                      setShowDeleteConfirm(true);
                    }}
                    className="p-2 text-gray-400 hover:text-red-600 cursor-pointer"
                    title="Delete"
                  >
                    <i className="ri-delete-bin-line"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
        title="Delete Sermon"
        message={`Are you sure you want to delete "${sermonToDelete?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        type="danger"
      />

      {filteredSermons.length === 0 && (
        <div className="text-center py-12">
          <i className="ri-file-search-line text-gray-400 text-4xl mb-4"></i>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No sermons found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
    </>
  );
}


