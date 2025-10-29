


import { useState } from 'react';

interface CreatePlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreatePlaylistModal({ isOpen, onClose }: CreatePlaylistModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    isPublic: false,
    selectedSermons: [] as number[]
  });

  const availableSermons = [
    { id: 1, title: 'Walking in Faith - Part 3', speaker: 'Pastor John Smith', duration: '45:30' },
    { id: 2, title: 'The Power of Prayer', speaker: 'Pastor David Wilson', duration: '38:15' },
    { id: 3, title: 'Love in Action - Serving Others', speaker: 'Pastor Sarah Johnson', duration: '42:20' },
    { id: 4, title: 'Finding Hope in Dark Times', speaker: 'Pastor Michael Brown', duration: '51:45' },
    { id: 5, title: 'Walking in Faith - Part 2', speaker: 'Pastor John Smith', duration: '47:10' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating playlist:', formData);
    onClose();
    setFormData({
      name: '',
      description: '',
      isPublic: false,
      selectedSermons: []
    });
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
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
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
                {availableSermons.map((sermon) => (
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
                      <div className="text-sm text-gray-500">{sermon.speaker} • {sermon.duration}</div>
                    </div>
                  </div>
                ))}
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
                className="px-6 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 cursor-pointer whitespace-nowrap"
              >
                Create Playlist
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
