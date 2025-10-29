import { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import DashboardHeader from '@/components/layout/DashboardHeader';

export default function ContentManagementPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [settings, setSettings] = useState({
    welcomeMessage: 'Welcome to Grace Community Church! We are glad you are here.',
    aboutUs: 'Grace Community Church has been serving the Springfield community for over 50 years. We are committed to loving God, loving people, and making disciples.'
  });
  const [services, setServices] = useState([
    { day: 'Sunday', time: '09:00 AM', service: 'Morning Worship' },
    { day: 'Sunday', time: '11:00 AM', service: 'Main Service' },
    { day: 'Wednesday', time: '07:00 PM', service: 'Bible Study' }
  ]);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (field: string, value: string) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
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
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 cursor-pointer whitespace-nowrap">
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
                            onClick={() => setServices(services.filter((_, i) => i !== index))}
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
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-save-line mr-2"></i>
                    Save Content
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
