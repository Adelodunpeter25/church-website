


import { useState } from 'react';

interface UploadSermonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UploadSermonModal({ isOpen, onClose }: UploadSermonModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    speaker: '',
    date: '',
    series: '',
    isPartOfSeries: false,
    description: '',
    audioFile: null as File | null,
    thumbnail: null as File | null
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Uploading sermon:', formData);
    onClose();
    setFormData({
      title: '',
      speaker: '',
      date: '',
      series: '',
      isPartOfSeries: false,
      description: '',
      audioFile: null,
      thumbnail: null
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'audioFile' | 'thumbnail') => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      [field]: file
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? (target as HTMLInputElement).checked : target.value;
    setFormData(prev => ({
      ...prev,
      [target.name]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Upload New Sermon</h3>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <i className="ri-close-line text-xl"></i>
            </button>
          </div>

          <form id="upload-sermon-form" onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sermon Title *
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter sermon title"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Speaker *
                </label>
                <select
                  name="speaker"
                  required
                  value={formData.speaker}
                  onChange={handleChange}
                  className="w-full pr-8 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Speaker</option>
                  <option value="Pastor John Smith">Pastor John Smith</option>
                  <option value="Pastor David Wilson">Pastor David Wilson</option>
                  <option value="Pastor Sarah Johnson">Pastor Sarah Johnson</option>
                  <option value="Pastor Michael Brown">Pastor Michael Brown</option>
                  <option value="Guest Speaker">Guest Speaker</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date *
                </label>
                <input
                  type="date"
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="isPartOfSeries"
                  checked={formData.isPartOfSeries}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">This sermon is part of a series</span>
              </label>
            </div>

            {formData.isPartOfSeries && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Series
                </label>
                <select
                  name="series"
                  value={formData.series}
                  onChange={handleChange}
                  className="w-full pr-8 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required={formData.isPartOfSeries}
                >
                  <option value="">Select a series</option>
                  <option value="walking-in-faith">Walking in Faith</option>
                  <option value="love-in-action">Love in Action</option>
                  <option value="grace-and-truth">Grace and Truth</option>
                  <option value="new-series">+ Create New Series</option>
                </select>
              </div>
            )}

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
                placeholder="Brief description of the sermon..."
              />
              <p className="text-xs text-gray-500 mt-1">{formData.description.length}/500 characters</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Audio File *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-md p-4">
                <input
                  type="file"
                  accept="audio/*"
                  onChange={(e) => handleFileChange(e, 'audioFile')}
                  className="hidden"
                  id="audio-upload"
                  required
                />
                <label htmlFor="audio-upload" className="cursor-pointer">
                  <div className="text-center">
                    <i className="ri-upload-cloud-line text-gray-400 text-3xl mb-2"></i>
                    <p className="text-sm text-gray-600">
                      {formData.audioFile ? formData.audioFile.name : 'Click to upload audio file'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">MP3, WAV files supported (max 500MB)</p>
                  </div>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Thumbnail Image
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-md p-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'thumbnail')}
                  className="hidden"
                  id="thumbnail-upload"
                />
                <label htmlFor="thumbnail-upload" className="cursor-pointer">
                  <div className="text-center">
                    <i className="ri-image-line text-gray-400 text-3xl mb-2"></i>
                    <p className="text-sm text-gray-600">
                      {formData.thumbnail ? formData.thumbnail.name : 'Click to upload thumbnail'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">JPG, PNG files supported (recommended: 400x300px)</p>
                  </div>
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer whitespace-nowrap"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 cursor-pointer whitespace-nowrap"
              >
                Upload Sermon
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
