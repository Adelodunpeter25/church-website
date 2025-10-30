


import { useState, useEffect } from 'react';
import { usePlaylists } from '@/hooks/usePlaylists';
import { useSermons } from '@/hooks/useSermons';

interface CreatePlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function CreatePlaylistModal({ isOpen, onClose, onSuccess }: CreatePlaylistModalProps) {
  const { createPlaylist, loading: playlistLoading } = usePlaylists();
  const { sermons, fetchSermons } = useSermons();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    isPublic: false,
    selectedSermons: [] as number[]
  });

  useEffect(() => {
    if (isOpen) {
      fetchSermons();
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createPlaylist({
      name: formData.name,
      description: formData.description,
      member_id: 1
    });
    onClose();
    setFormData({
      name: '',
      description: '',
      isPublic: false,
      selectedSermons: []
    });
    onSuccess?.();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setFormData(prev => ({
      ...prev,
      [e.target.name]: value
    }));
  };

  const toggleSermon = (sermonId: number) => {
    setFormData(prev => ({
      ...prev,
      selectedSermons: prev.selectedSermons.includes(sermonId)
        ? prev.selectedSermons.filter(id => id !== sermonId)
        : [...prev.selectedSermons, sermonId]
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 py-6 text-center">
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Create New Playlist</h3>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <i className="ri-close-line text-xl"></i>
            </button>
          </div>

          <form id="create-playlist-form" onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Playlist Name *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter playlist name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                rows={3}
                maxLength={500}
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe your playlist..."
              />
              <p className="text-xs text-gray-500 mt-1">{formData.description.length}/500 characters</p>
            </div>

            <div>
              <div className="flex items-center">
                <input
                  id="is-public"
                  name="isPublic"
                  type="checkbox"
                  checked={formData.isPublic}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="is-public" className="ml-2 text-sm text-gray-700">
                  Make this playlist public (others can view and listen)
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Sermons
              </label>
              <div className="max-h-64 overflow-y-auto border border-gray-300 rounded-md">
                {sermons && sermons.length > 0 ? (
                  sermons.map((sermon) => (
                    <div
                      key={sermon.id}
                      className={`flex items-center p-3 hover:bg-gray-50 cursor-pointer ${
                        formData.selectedSermons.includes(sermon.id) ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => toggleSermon(sermon.id)}
                    >
                      <input
                        type="checkbox"
                        checked={formData.selectedSermons.includes(sermon.id)}
                        onChange={() => toggleSermon(sermon.id)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <div className="ml-3 flex-1">
                        <div className="text-sm font-medium text-gray-900">{sermon.title}</div>
                        <div className="text-sm text-gray-500">{sermon.speaker} • {sermon.duration || 'N/A'}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500 text-sm">No sermons available</div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {formData.selectedSermons.length} sermons selected
              </p>
            </div>

            <div className="flex justify-end space-x-3 pt-6 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer whitespace-nowrap"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={playlistLoading}
                className="px-6 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {playlistLoading ? 'Creating...' : 'Create Playlist'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
