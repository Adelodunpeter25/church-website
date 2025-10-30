import { useState, useEffect } from 'react';
import { useSermons } from '@/hooks/useSermons';
import { useSeries } from '@/hooks/useSeries';
import { Sermon, SermonSeries } from '@/types';

interface EditSermonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  sermon: Sermon;
}

export default function EditSermonModal({ isOpen, onClose, onSuccess, sermon }: EditSermonModalProps) {
  const { updateSermon } = useSermons();
  const { getSeries } = useSeries();
  const [series, setSeries] = useState<SermonSeries[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingSeries, setLoadingSeries] = useState(false);
  const [formData, setFormData] = useState({
    title: sermon.title,
    speaker: sermon.speaker,
    date: sermon.date.split('T')[0],
    series: sermon.series_name || '',
    isPartOfSeries: !!sermon.series_name,
    description: sermon.description || '',
  });

  useEffect(() => {
    if (isOpen) {
      fetchSeries();
      const dateObj = new Date(sermon.date);
      const year = dateObj.getUTCFullYear();
      const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0');
      const day = String(dateObj.getUTCDate()).padStart(2, '0');
      const dateString = `${year}-${month}-${day}`;
      
      setFormData({
        title: sermon.title,
        speaker: sermon.speaker,
        date: dateString,
        series: sermon.series_name || '',
        isPartOfSeries: !!sermon.series_name,
        description: sermon.description || '',
      });
    }
  }, [isOpen, sermon]);

  const fetchSeries = async () => {
    try {
      setLoadingSeries(true);
      const data = await getSeries();
      setSeries(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching series:', error);
    } finally {
      setLoadingSeries(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updateData: any = {
        title: formData.title,
        speaker: formData.speaker,
        date: formData.date,
        description: formData.description,
        audio_url: sermon.audio_url,
        video_url: sermon.video_url,
        thumbnail_url: sermon.thumbnail_url,
        duration: sermon.duration,
        tags: sermon.tags,
      };

      if (formData.isPartOfSeries && formData.series) {
        const selectedSeries = series.find(s => s.name === formData.series);
        updateData.series_id = selectedSeries?.id || null;
      } else {
        updateData.series_id = null;
      }

      await updateSermon(sermon.id, updateData);
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Error updating sermon:', error);
      alert('Failed to update sermon. Please try again.');
    } finally {
      setLoading(false);
    }
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
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="inline-block align-middle bg-white rounded-xl px-4 pt-5 pb-4 text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Edit Sermon</h3>
              <p className="text-sm text-gray-500 mt-1">Update sermon details</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            >
              <i className="ri-close-line text-2xl"></i>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Sermon Title *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="ri-book-open-line text-gray-400"></i>
                </div>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter sermon title"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Speaker *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="ri-user-voice-line text-gray-400"></i>
                  </div>
                  <input
                    type="text"
                    name="speaker"
                    required
                    value={formData.speaker}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Speaker name"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Sermon Date *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="ri-calendar-line text-gray-400"></i>
                  </div>
                  <input
                    type="date"
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
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
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Series
                </label>
                <select
                  name="series"
                  value={formData.series}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                  required={formData.isPartOfSeries}
                  disabled={loadingSeries}
                >
                  <option value="">
                    {loadingSeries ? 'Loading...' : 'Select a series'}
                  </option>
                  {series.length === 0 && !loadingSeries ? (
                    <option value="" disabled>No series available</option>
                  ) : (
                    series.map((s) => (
                      <option key={s.id} value={s.name}>{s.name}</option>
                    ))
                  )}
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                rows={3}
                maxLength={500}
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                placeholder="Brief description of the sermon..."
              />
              <p className="text-xs text-gray-500 mt-1.5">{formData.description.length}/500 characters</p>
            </div>

            <div className="flex justify-between pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 border border-transparent rounded-lg hover:from-blue-700 hover:to-blue-800 shadow-sm cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? (
                  <span className="flex items-center">
                    <i className="ri-loader-4-line animate-spin mr-2"></i>
                    Updating...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <i className="ri-save-line mr-2"></i>
                    Update Sermon
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
