'use client';

import { useState } from 'react';

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [showAddUser, setShowAddUser] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'member',
    department: '',
    permissions: []
  });

  const [users] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john@gracechurch.org',
      role: 'Admin',
      department: 'Leadership',
      lastLogin: '2024-01-15 09:30 AM',
      status: 'Active',
      permissions: ['Full Access']
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah@gracechurch.org',
      role: 'Pastor',
      department: 'Pastoral',
      lastLogin: '2024-01-14 07:45 PM',
      status: 'Active',
      permissions: ['Sermons', 'Events', 'Members']
    },
    {
      id: 3,
      name: 'Mike Wilson',
      email: 'mike@gracechurch.org',
      role: 'Staff',
      department: 'Youth Ministry',
      lastLogin: '2024-01-12 02:15 PM',
      status: 'Active',
      permissions: ['Events', 'Announcements']
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily@gracechurch.org',
      role: 'Volunteer',
      department: 'Music Ministry',
      lastLogin: '2024-01-10 06:20 PM',
      status: 'Inactive',
      permissions: ['Limited Access']
    }
  ]);

  const roles = [
    { value: 'admin', label: 'Administrator', color: 'bg-red-100 text-red-800' },
    { value: 'pastor', label: 'Pastor', color: 'bg-purple-100 text-purple-800' },
    { value: 'staff', label: 'Staff', color: 'bg-blue-100 text-blue-800' },
    { value: 'volunteer', label: 'Volunteer', color: 'bg-green-100 text-green-800' },
    { value: 'member', label: 'Member', color: 'bg-gray-100 text-gray-800' }
  ];

  const permissions = [
    'Dashboard Access',
    'Member Management',
    'Sermon Management',
    'Event Management',
    'Announcement Management',
    'Form Management',
    'Live Streaming',
    'Financial Reports',
    'System Settings'
  ];

  const handleAddUser = () => {
    setShowAddUser(false);
    setNewUser({ name: '', email: '', role: 'member', department: '', permissions: [] });
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role.toLowerCase() === selectedRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="max-w-6xl">
      {showSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-md p-4">
          <div className="flex">
            <i className="ri-check-circle-line text-green-400 text-lg mr-3 flex-shrink-0"></i>
            <div>
              <p className="text-sm font-medium text-green-800">User management action completed successfully!</p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {/* User Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Users', value: '247', icon: 'ri-group-line', color: 'bg-blue-500' },
            { label: 'Active Users', value: '231', icon: 'ri-user-line', color: 'bg-green-500' },
            { label: 'Staff Members', value: '12', icon: 'ri-shield-user-line', color: 'bg-purple-500' },
            { label: 'Volunteers', value: '45', icon: 'ri-heart-line', color: 'bg-orange-500' }
          ].map((stat, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center">
                <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <i className={`${stat.icon} text-white text-lg`}></i>
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <i className="ri-search-line absolute left-3 top-2.5 text-gray-400 text-sm"></i>
            </div>

            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="pr-8 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="all">All Roles</option>
              {roles.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setShowAddUser(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 cursor-pointer whitespace-nowrap"
          >
            <i className="ri-add-line mr-2"></i>
            Add New User
          </button>
        </div>

        {/* Users Table */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => {
                const roleConfig = roles.find(r => r.label.toLowerCase() === user.role.toLowerCase()) || roles[4];
                return (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold text-sm">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${roleConfig.color}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.lastLogin}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900 cursor-pointer">
                          <i className="ri-edit-line"></i>
                        </button>
                        <button className="text-green-600 hover:text-green-900 cursor-pointer">
                          <i className="ri-key-line"></i>
                        </button>
                        <button className="text-red-600 hover:text-red-900 cursor-pointer">
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Role Management */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Role Management</h3>
              <p className="text-sm text-gray-600">Manage user roles and their permissions</p>
            </div>
            <button className="bg-gray-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-700 cursor-pointer whitespace-nowrap">
              <i className="ri-add-line mr-2"></i>
              Create Role
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roles.map((role) => (
              <div key={role.value} className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${role.color}`}>
                    {role.label}
                  </span>
                  <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
                    <i className="ri-more-line"></i>
                  </button>
                </div>
                <div className="space-y-2">
                  {permissions.slice(0, 4).map((permission, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-600">
                      <i className="ri-check-line text-green-500 mr-2"></i>
                      {permission}
                    </div>
                  ))}
                  <button className="text-blue-600 hover:text-blue-800 text-sm cursor-pointer">
                    View all permissions
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Add New User</h3>
              <button
                onClick={() => setShowAddUser(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className="w-full pr-8 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {roles.map((role) => (
                    <option key={role.value} value={role.value}>
                      {role.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <input
                  type="text"
                  value={newUser.department}
                  onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleAddUser}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 cursor-pointer whitespace-nowrap"
                >
                  Add User
                </button>
                <button
                  onClick={() => setShowAddUser(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-300 cursor-pointer whitespace-nowrap"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}