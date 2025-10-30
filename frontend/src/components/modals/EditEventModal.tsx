import { useState, useEffect } from 'react';
import { useEvents } from '@/hooks/useEvents';

interface EditEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventId: number;
}

export default function EditEventModal({ isOpen, onClose, eventId }: EditEventModalProps) {
  const { getEvent, updateEvent } = useEvents();
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    start_time: '',
    end_time: '',
    location: '',
    type: 'general',
    capacity: '',
    registrationRequired: true,
    registrationDeadline: '',
    organizer: '',
    cost: '',
    recurring: false,
    recurringType: 'weekly'
  });

  useEffect(() => {
    if (isOpen && eventId) {
      fetchEvent();
    }
  }, [isOpen, eventId]);

  const fetchEvent = async () => {
    try {
      setLoadingData(true);
      const event = await getEvent(eventId.toString());
      setFormData({
        title: event.title || '',
        description: event.description || '',
        startDate: event.date ? event.date.split('T')[0] : '',
        endDate: event.end_date ? event.end_date.split('T')[0] : '',
        start_time: event.start_time || '',
        end_time: event.end_time || '',
        location: event.location || '',
        type: event.type || 'general',
        capacity: event.capacity?.toString() || '',
        registrationRequired: event.registration_required ?? true,
        registrationDeadline: event.registration_deadline ? event.registration_deadline.split('T')[0] : '',
        organizer: event.organizer || '',
        cost: event.cost?.toString() || '',
        recurring: event.recurring || false,
        recurringType: event.recurring_type || 'weekly'
      });
    } catch (error) {
      console.error('Error fetching event:', error);
    } finally {
      setLoadingData(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateEvent(eventId.toString(), formData);
      onClose();
    } catch (error) {
      console.error('Error updating event:', error);
      alert('Failed to update event');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setFormData(prev => ({
      ...prev,
      [e.target.name]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Edit Event</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <i className="ri-close-line text-xl"></i>
            </button>
          </div>
          
          {loadingData ? (
            <div className="text-center py-8">Loading event data...</div>
          ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Event Title *</label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
              <textarea
                name="description"
                required
                rows={4}
                maxLength={500}
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">{formData.description.length}/500 characters</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
                <input
                  type="date"
                  name="startDate"
                  required
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Time *</label>
                <input
                  type="time"
                  name="start_time"
                  required
                  value={formData.start_time}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                <input
                  type="time"
                  name="end_time"
                  value={formData.end_time}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
              <input
                type="text"
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="general">General</option>
                  <option value="worship">Worship</option>
                  <option value="fellowship">Fellowship</option>
                  <option value="outreach">Outreach</option>
                  <option value="education">Education</option>
                  <option value="youth">Youth</option>
                  <option value="children">Children</option>
                  <option value="seniors">Seniors</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Organizer</label>
                <input
                  type="text"
                  name="organizer"
                  value={formData.organizer}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cost (optional)</label>
              <input
                type="number"
                name="cost"
                value={formData.cost}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
                min="0"
                step="0.01"
              />
            </div>
            
            <div className="border-t pt-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Registration Settings</h4>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    id="registration-required"
                    name="registrationRequired"
                    type="checkbox"
                    checked={formData.registrationRequired}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="registration-required" className="ml-2 text-sm text-gray-700">
                    Registration required for this event
                  </label>
                </div>

                {formData.registrationRequired && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Attendees</label>
                      <input
                        type="number"
                        name="capacity"
                        value={formData.capacity}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Unlimited"
                        min="1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Registration Deadline</label>
                      <input
                        type="date"
                        name="registrationDeadline"
                        value={formData.registrationDeadline}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="border-t pt-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Recurring Event</h4>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    id="recurring"
                    name="recurring"
                    type="checkbox"
                    checked={formData.recurring}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="recurring" className="ml-2 text-sm text-gray-700">
                    This is a recurring event
                  </label>
                </div>

                {formData.recurring && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Recurring Type</label>
                    <select
                      name="recurringType"
                      value={formData.recurringType}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                    </select>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-6 border-t">
              <button type="button" onClick={onClose} className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer whitespace-nowrap">
                Cancel
              </button>
              <button type="submit" disabled={loading} className="px-6 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 cursor-pointer whitespace-nowrap disabled:opacity-50">
                {loading ? 'Updating...' : 'Save Changes'}
              </button>
            </div>
          </form>
          )}
        </div>
      </div>
    </div>
  );
}
