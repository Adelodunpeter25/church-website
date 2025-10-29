import { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import DashboardHeader from '@/components/layout/DashboardHeader';
import MemberList from './MemberList';
import AddMemberModal from './AddMemberModal';

export default function MembershipPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="lg:pl-72">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-2xl font-bold text-gray-900">Membership Management</h1>
                <p className="mt-2 text-sm text-gray-700">
                  Manage your church members, track attendance, and maintain member records.
                </p>
              </div>
              <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                <button
                  type="button"
                  onClick={() => setShowAddModal(true)}
                  className="block rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 cursor-pointer whitespace-nowrap"
                >
                  Add Member
                </button>
              </div>
            </div>

            <div className="mt-8 bg-white shadow-sm rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex-1 max-w-md">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                        <i className="ri-search-line text-gray-400 text-sm"></i>
                      </div>
                      <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Search members..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <select
                      value={filterRole}
                      onChange={(e) => setFilterRole(e.target.value)}
                      className="pr-8 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="all">All Roles</option>
                      <option value="member">Member</option>
                      <option value="leader">Leader</option>
                      <option value="volunteer">Volunteer</option>
                    </select>
                    <button 
                      onClick={() => {
                        console.log('Exporting members data');
                        alert('Export functionality would download CSV/Excel file');
                      }}
                      className="p-2 text-gray-400 hover:text-gray-600 cursor-pointer"
                      title="Export"
                    >
                      <div className="w-5 h-5 flex items-center justify-center">
                        <i className="ri-download-line"></i>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
              
              <MemberList searchTerm={searchTerm} filterRole={filterRole} />
            </div>
          </div>
        </main>
      </div>

      <AddMemberModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} />
    </div>
  );
}
