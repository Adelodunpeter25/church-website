import { useState, useEffect } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import DashboardHeader from '@/components/layout/DashboardHeader';
import { useContent } from '@/hooks/useContent';

export default function ContentManagementPage() {
  const { getContent, updateContent, getServiceTimes, createServiceTime, deleteServiceTime } = useContent();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [settings, setSettings] = useState({
    welcomeMessage: '',
    aboutUs: ''
  });
  const [services, setServices] = useState<any[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAddService, setShowAddService] = useState(false);
  const [newService, setNewService] = useState({ day: 'Sunday', time: '', service: '' });

  useEffect(() => {
    loadContent();
    loadServices();
  }, []);

  const loadContent = async () => {
    try {
      const data = await getContent();
      setSettings({
        welcomeMessage: data.welcome_message || '',
        aboutUs: data.about_us || ''
      });
    } catch (error) {
      console.error('Error loading content:', error);
    }
  };

  const loadServices = async () => {
    try {
      const data = await getServiceTimes();
      setServices(data);
    } catch (error) {
      console.error('Error loading services:', error);
    }
  };

  const handleChange = (field: string, value: string) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateContent('welcome_message', settings.welcomeMessage);
      await updateContent('about_us', settings.aboutUs);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleAddService = async () => {
    await createServiceTime(newService);
    setShowAddService(false);
    setNewService({ day: 'Sunday', time: '', service: '' });
    loadServices();
  };

  const handleDeleteService = async (id: number) => {
    await deleteServiceTime(id);
    loadServices();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="lg:pl-72">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
              <p className="mt-2 text-gray-600">
                Manage your church's website content and messaging.
              </p>
            </div>

            <div className="bg-white shadow-sm rounded-lg p-6">
              {showSuccess && (
                <div className="mb-6 bg-green-50 border border-green-200 rounded-md p-4">
                  <div className="flex">
                    <i className="ri-check-circle-line text-green-400 text-lg mr-3 flex-shrink-0"></i>
                    <div>
                      <p className="text-sm font-medium text-green-800">Content saved successfully!</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="max-w-4xl space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Welcome Message
                  </label>
                  <textarea
                    rows={3}
                    value={settings.welcomeMessage}
                    onChange={(e) => handleChange('welcomeMessage', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    maxLength={500}
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    This message will be displayed on the landing page
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    About Us Description
                  </label>
                  <textarea
                    rows={4}
                    value={settings.aboutUs}
                    onChange={(e) => handleChange('aboutUs', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    maxLength={1000}
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Brief description about your church for the about section
                  </p>
                </div>

                <div className="border-t border-gray-200 pt-6 mt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Service Times</h3>
                    <button onClick={() => setShowAddService(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 cursor-pointer whitespace-nowrap">
                      <i className="ri-add-line mr-2"></i>
                      Add Service
                    </button>
                  </div>

                  <div className="space-y-4 mb-6">
                    {services.map((service, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div>
                            <p className="font-medium text-gray-900">{service.service}</p>
                            <p className="text-sm text-gray-600">{service.day} at {service.time}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-800 cursor-pointer">
                            <i className="ri-edit-line"></i>
                          </button>
                          <button 
                            onClick={() => handleDeleteService(service.id)}
                            className="text-red-600 hover:text-red-800 cursor-pointer"
                          >
                            <i className="ri-delete-bin-line"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <i className="ri-save-line mr-2"></i>
                    {loading ? 'Saving...' : 'Save Content'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {showAddService && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 py-6 text-center">
            <div className="fixed inset-0 transition-opacity" onClick={() => setShowAddService(false)}>
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
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
                  />
                </div>
                <div className="flex justify-end space-x-3 pt-4 border-t">
                  <button onClick={() => setShowAddService(false)} className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Cancel
                  </button>
                  <button onClick={handleAddService} className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
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
