import { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import DashboardHeader from '@/components/layout/DashboardHeader';
import HomeContent from './HomeContent';
import AboutContent from './AboutContent';
import ContactContent from './ContactContent';
import ServiceContent from './ServiceContent';

export default function ContentManagementPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  const tabs = [
    { id: 'home', label: 'Home', icon: 'ri-home-line' },
    { id: 'about', label: 'About', icon: 'ri-information-line' },
    { id: 'contact', label: 'Contact', icon: 'ri-mail-line' },
    { id: 'service', label: 'Service Times', icon: 'ri-time-line' }
  ];

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

            <div className="bg-white shadow-sm rounded-lg">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === tab.id
                          ? 'border-blue-600 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <i className={`${tab.icon} mr-2`}></i>
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {activeTab === 'home' && <HomeContent />}
                {activeTab === 'about' && <AboutContent />}
                {activeTab === 'contact' && <ContactContent />}
                {activeTab === 'service' && <ServiceContent />}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
