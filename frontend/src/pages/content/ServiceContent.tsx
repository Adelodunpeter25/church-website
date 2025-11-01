import { useState, useEffect } from 'react';
import { useContent } from '@/hooks/useContent';

export default function ServiceContent() {
  const { getServiceTimes, createServiceTime, deleteServiceTime } = useContent();
  const [services, setServices] = useState<any[]>([]);
  const [showAddService, setShowAddService] = useState(false);
  const [newService, setNewService] = useState({ day: 'Sunday', time: '', service: '', description: '' });

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const data = await getServiceTimes();
      setServices(data);
    } catch (error) {
      console.error('Error loading services:', error);
    }
  };

  const handleAddService = async () => {
    await createServiceTime(newService);
    setShowAddService(false);
    setNewService({ day: 'Sunday', time: '', service: '', description: '' });
    loadServices();
  };

  const handleDeleteService = async (id: number) => {
    await deleteServiceTime(id);
    loadServices();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Service Times</h3>
        <button
          onClick={() => setShowAddService(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
        >
          <i className="ri-add-line mr-2"></i>
          Add Service
        </button>
      </div>

      <div className="space-y-4">
        {services.map((service) => (
          <div key={service.id} className="flex items-start justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex-1">
              <p className="font-medium text-gray-900">{service.service}</p>
              <p className="text-sm text-gray-600">{service.day} at {service.time}</p>
              {service.description && (
                <p className="text-sm text-gray-500 mt-1">{service.description}</p>
              )}
            </div>
            <button
              onClick={() => handleDeleteService(service.id)}
              className="text-red-600 hover:text-red-800 ml-4"
            >
              <i className="ri-delete-bin-line"></i>
            </button>
          </div>
        ))}
      </div>

      {showAddService && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 py-6">
            <div className="fixed inset-0 bg-gray-500 opacity-75" onClick={() => setShowAddService(false)}></div>
            <div className="relative bg-white rounded-lg px-4 pt-5 pb-4 shadow-xl sm:max-w-lg sm:w-full sm:p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Add Service Time</h3>
                <button onClick={() => setShowAddService(false)} className="text-gray-400 hover:text-gray-600">
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Day</label>
                  <select
                    value={newService.day}
                    onChange={(e) => setNewService({ ...newService, day: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option>Sunday</option>
                    <option>Monday</option>
                    <option>Tuesday</option>
                    <option>Wednesday</option>
                    <option>Thursday</option>
                    <option>Friday</option>
                    <option>Saturday</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                  <input
                    type="time"
                    value={newService.time}
                    onChange={(e) => setNewService({ ...newService, time: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Service Name</label>
                  <input
                    type="text"
                    value={newService.service}
                    onChange={(e) => setNewService({ ...newService, service: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Sunday Morning Service"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description (Optional)</label>
                  <textarea
                    rows={3}
                    value={newService.description}
                    onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Join us for inspiring worship..."
                  />
                  <p className="mt-1 text-xs text-gray-500">Leave empty if no description needed</p>
                </div>
                <div className="flex justify-end space-x-3 pt-4 border-t">
                  <button
                    onClick={() => setShowAddService(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddService}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
                  >
                    Add Service
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
